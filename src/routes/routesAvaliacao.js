const express = require('express')
const router = express.Router()
const controllerAvaliacao = require('../controller/usuario/controllerAvaliacao')

router.post(
    '/post',
    controllerAvaliacao.postAvaliacao
)
router.delete(
    '/delete/:idAvaliacao',
    controllerAvaliacao.deleteAvaliacao
)
router.put(
    '/put/:idAvaliacao',
    controllerAvaliacao.putAvaliacao
)
router.get(
    '/get/getSearchAll',
    controllerAvaliacao.getSearchAllAvaliacao
)
router.get(
    '/get/getSearch/:idAvaliacao',
    controllerAvaliacao.getSearchAvaliacao
)

module.exports = router