const express = require('express')
const router = express.Router()

const AnonymizerController = require('./../controllers/AnonymizerController')
const controller = new AnonymizerController()

router.post('/anonymizer/execute', controller.handle)

module.exports = router