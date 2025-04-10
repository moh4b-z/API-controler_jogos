const express = require('express')
const router = express.Router()

const routesJogo = require('./routesJogo')

router.use('/jogo', routesJogo)

module.exports = router
