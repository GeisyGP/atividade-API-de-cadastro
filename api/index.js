const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const mongoose = require('mongoose')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

mongoose.connect('mongodb://127.0.0.1:27017/API-atividade', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 5000
}).then(() => {}).catch(err => {
  console.log(err)
})

app.get('/', (req, res) => {
  res.json({ message: 'Hello world' })
})

const port = 1818
app.listen(port, () => {
  console.log('Servidor rodando!')
})
