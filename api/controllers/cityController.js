const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const city = require('../models/city')

const City = mongoose.model('City', city)

router.post('/', async (req, res) => {
  if (req.body.name === undefined || req.body.state === undefined) {
    res.sendStatus(400)
    return
  }
  try {
    let newCity = await City.find({ name: req.body.name })

    if (newCity.length > 0) {
      res.status(400).json({ error: 'Cidade já cadastrada' })
      return
    }
    newCity = new City({ name: req.body.name, state: req.body.state })
    await newCity.save()
    res.status(201).json({ name: req.body.name, state: req.body.state })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/name/:name', async (req, res) => {
  const name = req.params.name

  try {
    const cities = await City.findOne({ name })
    if (cities) {
      res.json(cities)
    } else {
      res.status(404).json({ error: 'Cidade não encontrada' })
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

router.get('/state/:state', async (req, res) => {
  const state = req.params.state

  try {
    const cities = await City.find({ state })
    if (cities.length > 0) {
      res.json(cities)
    } else {
      res.status(404).json({ error: 'Estado não encontrado' })
    }
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
