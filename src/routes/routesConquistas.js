const express = require('express')
const router = express.Router()
const controllerConquistas = require('../controller/jogo/controllerConquistas')

router.post(
    '/post',
    controllerConquistas.postConquistas
)
router.delete(
    '/delete/:idConquistas',
    controllerConquistas.deleteConquistas
)
router.put(
    '/put/:idConquistas',
    controllerConquistas.putConquistas
)
router.get(
    '/get/getSearchAll',
    controllerConquistas.getSearchAllConquistas
)
router.get(
    '/get/getSearch/:idConquistas',
    controllerConquistas.getSearchConquistas
)

module.exports = router