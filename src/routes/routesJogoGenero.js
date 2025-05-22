const express = require('express')
const router = express.Router()
const controllerJogo_genero = require('../controller/jogo/controllerJogoGenero')

router.post(
    '/post',
    controllerJogo_genero.postJogo_genero
)
router.delete(
    '/delete/:idJogo_genero',
    controllerJogo_genero.deleteJogo_genero
)
router.put(
    '/put/:idJogo_genero',
    controllerJogo_genero.putJogo_genero
)
router.get(
    '/get/getSearchAll',
    controllerJogo_genero.getSearchAllJogo_genero
)
router.get(
    '/get/getSearch/:idJogo_genero',
    controllerJogo_genero.getSearchJogo_genero
)

module.exports = router