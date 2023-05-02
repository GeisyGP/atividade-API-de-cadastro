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
    const city = await City.findOne({ name: req.body.name })

    if (city !== undefined) {
      res.statusCode = 400
      res.json({ error: 'Cidade já cadastrada' })
      return
    }
    const newCity = new City({ name: req.body.name, state: req.body.state })
    await newCity.save()
    res.status(201).json({ name: req.body.name, state: req.body.state })
  } catch (err) {
    console.log(err)
    res.sendStatus(500)
  }
})

module.exports = router
