const express = require('express')
const router = express.Router()
const controllerJogo = require('../controller/jogo/controllerJogo')

router.post(
    '/post',
    controllerJogo.postJogo
)
router.delete(
    '/delete/:idJogo',
    controllerJogo.deleteJogo
)
router.put(
    '/put/:idJogo',
    controllerJogo.putJogo
)
router.get(
    '/get/getSearchAllJogo',
    controllerJogo.getSearchAllJogo
)
router.get(
    '/get/getSearchJogo/:idJogo',
    controllerJogo.getSearchJogo
)

module.exports = router