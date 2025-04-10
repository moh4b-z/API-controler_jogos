const express = require('express')
const router = express.Router()
const controllerPaises = require('../controller/paises/controllerPaises')

router.post(
    '/post',
    controllerPaises.postPaises
)
router.delete(
    '/delete/:idPaises',
    controllerPaises.deletePaises
)
router.put(
    '/put/:idPaises',
    controllerPaises.putPaises
)
router.get(
    '/get/getSearchAllPaises',
    controllerPaises.getSearchAllPaises
)
router.get(
    '/get/getSearchPaises/:idPaises',
    controllerPaises.getSearchPaises
)

module.exports = router