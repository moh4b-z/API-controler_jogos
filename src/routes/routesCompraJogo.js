const express = require('express')
const router = express.Router()
const controllerCompraJogo = require('../controller/compraJogo/controllerCompraJogo')

router.post(
    '/post',
    controllerCompraJogo.postCompraJogo
)
router.delete(
    '/delete/:idCompraJogo',
    controllerCompraJogo.deleteCompraJogo
)
router.put(
    '/put/:idCompraJogo',
    controllerCompraJogo.putCompraJogo
)
router.get(
    '/get/getSearchAll',
    controllerCompraJogo.getSearchAllCompraJogo
)
router.get(
    '/get/getSearch/:idCompraJogo',
    controllerCompraJogo.getSearchCompraJogo
)

module.exports = router