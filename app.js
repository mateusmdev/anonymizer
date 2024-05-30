const express = require('express')
const app = express()
const cors = require('cors')

const anonymizerRouter = require('./src/routes/anonymizer')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', anonymizerRouter)

module.exports = app