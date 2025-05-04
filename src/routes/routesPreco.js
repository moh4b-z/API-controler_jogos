const express = require('express')
const router = express.Router()
const controllerPreco = require('../controller/preco/controllerPreco')

router.post(
    '/post',
    controllerPreco.postPreco
)
router.delete(
    '/delete/:idPreco',
    controllerPreco.deletePreco
)
router.put(
    '/put/:idPreco',
    controllerPreco.putPreco
)
router.get(
    '/get/getSearchAll',
    controllerPreco.getSearchAllPreco
)
router.get(
    '/get/getSearch/:idPreco',
    controllerPreco.getSearchPreco
)

module.exports = router