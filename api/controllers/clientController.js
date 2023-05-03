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
    res.sendStatus(400)
    return
  }

  const cityName = req.body.currentCity
  const cityRef = await City.findOne({ name: cityName })
  if (!cityRef) {
    return res.status(400).json({ error: 'Cidade não encontrada. Cadastre-a em /city' })
  }

  try {
    const newClient = new Client({
      name: req.body.name,
      gender: req.body.gender,
      birth: req.body.birth,
      age: req.body.age,
      currentCity: city._id
    })
    await newClient.save()
    res.status(201).json(newClient)
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
