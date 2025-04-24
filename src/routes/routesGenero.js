const express = require('express')
const router = express.Router()
const controllerGenero = require('../controller/genero/controllerGenero')

router.post(
    '/post',
    controllerGenero.postGenero
)
router.delete(
    '/delete/:idGenero',
    controllerGenero.deleteGenero
)
router.put(
    '/put/:idGenero',
    controllerGenero.putGenero
)
router.get(
    '/get/getSearchAll',
    controllerGenero.getSearchAllGenero
)
router.get(
    '/get/getSearch/:idGenero',
    controllerGenero.getSearchGenero
)

module.exports = router