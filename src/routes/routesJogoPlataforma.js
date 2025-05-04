const express = require('express')
const router = express.Router()
const controllerJogo_plataforma = require('../controller/jogoPlataforma/controllerJogoPlataforma')

router.post(
    '/post',
    controllerJogo_plataforma.postJogo_plataforma
)
router.delete(
    '/delete/:idJogo_plataforma',
    controllerJogo_plataforma.deleteJogo_plataforma
)
router.put(
    '/put/:idJogo_plataforma',
    controllerJogo_plataforma.putJogo_plataforma
)
router.get(
    '/get/getSearchAll',
    controllerJogo_plataforma.getSearchAllJogo_plataforma
)
router.get(
    '/get/getSearch/:idJogo_plataforma',
    controllerJogo_plataforma.getSearchJogo_plataforma
)

module.exports = router