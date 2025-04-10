const express = require('express')
const router = express.Router()
const controllerPlataforma = require('../controller/plataforma/controllerPlataforma')

router.post(
    '/post',
    controllerPlataforma.postPlataforma
)
router.delete(
    '/delete/:idPlataforma',
    controllerPlataforma.deletePlataforma
)
router.put(
    '/put/:idPlataforma',
    controllerPlataforma.putPlataforma
)
router.get(
    '/get/getSearchAllPlataforma',
    controllerPlataforma.getSearchAllPlataforma
)
router.get(
    '/get/getSearchPlataforma/:idPlataforma',
    controllerPlataforma.getSearchPlataforma
)

module.exports = router