const mongoose = require('mongoose')

const City = new mongoose.Schema({
  name: String,
  state: String
})

module.exports = City
