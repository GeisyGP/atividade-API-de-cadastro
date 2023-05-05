const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const city = require('../models/city')

const City = mongoose.model('City', city)

router.post('/', async (req, res) => {
  if (req.body.name === undefined || req.body.state === undefined) {
    return res.sendStatus(400)
  }

  const name = req.body.name.toUpperCase()
  const state = req.body.state.toUpperCase()

  try {
    let newCity = await City.find({ name })

    if (newCity.length > 0) {
      return res.status(400).json({ error: 'Cidade já cadastrada' })
    }
    newCity = new City({ name, state })
    await newCity.save()
    res.status(201).json({ name, state })
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
})

router.get('/name/:name', async (req, res) => {
  const name = req.params.name.toUpperCase()

  try {
    const cities = await City.findOne({ name })
    if (cities) {
      return res.json(cities)
    } else {
      return res.status(404).json({ error: 'Cidade não encontrada' })
    }
  } catch (err) {
    console.log(err)
    return res.sendStatus(500)
  }
})

router.get('/state/:state', async (req, res) => {
  const state = req.params.state.toUpperCase()

  try {
    const cities = await City.find({ state })
    if (cities.length > 0) {
      return res.json(cities)
    } else {
      return res.status(404).json({ error: 'Estado não encontrado' })
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
