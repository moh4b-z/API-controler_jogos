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
    '/get/getSearchAll',
    controllerJogo.getSearchAllJogo
)
router.get(
    '/get/getSearchAllCarateriticas',
    controllerJogo.getSearchAllCarateriticas
)
router.get(
    '/get/getSearch/:idJogo',
    controllerJogo.getSearchJogo
)

module.exports = router