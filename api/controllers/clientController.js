const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const client = require('../models/client')
const city = require('../models/city')

const City = mongoose.model('City', city)
const Client = mongoose.model('Client', client)

router.post('/', async (req, res) => {
  if (!req.body.name ||
    !req.body.gender ||
    !req.body.birth ||
    !req.body.age ||
    !req.body.currentCity) {
    return res.sendStatus(400)
  }

  const cityName = req.body.currentCity
  const cityRef = await City.findOne({ name: cityName })
  if (!cityRef) {
    return res.status(400).json({ error: 'Cidade não encontrada' })
  }

  try {
    const newClient = new Client({
      name: req.body.name,
      gender: req.body.gender,
      birth: req.body.birth,
      age: req.body.age,
      currentCity: cityRef._id
    })
    await newClient.save()
    res.status(201).json(newClient)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/name/:name', async (req, res) => {
  const name = req.params.name

  try {
    const clientResult = await Client.findOne({ name }).populate('currentCity')
    if (clientResult) {
      return res.json(clientResult)
    } else {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/id/:id', async (req, res) => {
  const id = req.params.id

  try {
    const clientResult = await Client.findOne({ _id: id }).populate('currentCity')
    if (clientResult) {
      return res.json(clientResult)
    } else {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
