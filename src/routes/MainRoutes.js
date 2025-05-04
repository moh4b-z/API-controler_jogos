const express = require('express')
const router = express.Router()

const routesGenero = require('./routesGenero')
const routesJogo = require('./routesJogo')
const routesJogoGenero = require('./routesJogoGenero')
const routesPaises = require('./routesPaises')
const routesPlataforma = require('./routesPlataforma')
const routesSexo = require('./routesSexo')
const routesTipoPagamento = require('./routesTipoPagamento')
const routesDlc = require('./routesDlc')

router.use('/genero', routesGenero)
router.use('/jogo', routesJogo)
router.use('/jogo-genero', routesJogoGenero)
router.use('/paises', routesPaises)
router.use('/plataforma', routesPlataforma)
router.use('/sexo', routesSexo)
router.use('/tipo-pagamento', routesTipoPagamento)
router.use('/dlc', routesDlc)

module.exports = router