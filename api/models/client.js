const mongoose = require('mongoose')

const Client = new mongoose.Schema({
  name: String,
  gender: String,
  birth: Date,
  age: Number,
  currentCity: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'City'
  }
})

module.exports = Client
