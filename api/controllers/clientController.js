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

  const name = req.body.name.toUpperCase()
  const gender = req.body.gender.toUpperCase()
  const cityName = req.body.currentCity.toUpperCase()

  const cityRef = await City.findOne({ name: cityName })
  if (!cityRef) {
    return res.status(400).json({ error: 'Cidade não encontrada' })
  }

  try {
    const newClient = new Client({
      name,
      gender,
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
  const name = req.params.name.toUpperCase()

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

router.delete('/:id', async (req, res) => {
  const id = req.params.id

  try {
    const clientResult = await Client.findOne({ _id: id })
    if (clientResult) {
      await Client.deleteOne({ _id: id })
      return res.sendStatus(204)
    } else {
      return res.status(404).json({ error: 'Cliente não encontrado' })
    }
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
})

router.put('/:id', async (req, res) => {
  const id = req.params.id
  const clientResult = await Client.findOne({ _id: id })

  if (!clientResult) {
    return res.status(404).json({ error: 'Cliente não encontrado' })
  }

  const name = req.body.name.toUpperCase()

  try {
    const clientUpdate = await Client.findByIdAndUpdate(id, { name }, { new: true })
    return res.status(200).json(clientUpdate)
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
})

module.exports = router
