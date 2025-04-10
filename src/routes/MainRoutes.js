const express = require('express')
const router = express.Router()

const routesGenero = require('./routesGenero')
const routesJogo = require('./routesJogo')
const routesPaises = require('./routesPaises')
const routesPlataforma = require('./routesPlataforma')
const routesSexo = require('./routesSexo')
const routesTipoPagamento = require('./routesTipoPagamento')

router.use('/genero', routesGenero)
router.use('/jogo', routesJogo)
router.use('/paises', routesPaises)
router.use('/plataforma', routesPlataforma)
router.use('/sexo', routesSexo)
router.use('/tipo-pagamento', routesTipoPagamento)

module.exports = router
