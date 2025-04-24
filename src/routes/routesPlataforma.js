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
    '/get/getSearchAll',
    controllerPlataforma.getSearchAllPlataforma
)
router.get(
    '/get/getSearch/:idPlataforma',
    controllerPlataforma.getSearchPlataforma
)

module.exports = router