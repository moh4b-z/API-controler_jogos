const express = require('express')
const router = express.Router()
const controllerUsuarioConquistas = require('../controller/usuarioConquistas/controllerUsuarioConquistas')

router.post(
    '/post',
    controllerUsuarioConquistas.postUsuarioConquistas
)
router.delete(
    '/delete/:idUsuarioConquistas',
    controllerUsuarioConquistas.deleteUsuarioConquistas
)
router.put(
    '/put/:idUsuarioConquistas',
    controllerUsuarioConquistas.putUsuarioConquistas
)
router.get(
    '/get/getSearchAll',
    controllerUsuarioConquistas.getSearchAllUsuarioConquistas
)
router.get(
    '/get/getSearch/:idUsuarioConquistas',
    controllerUsuarioConquistas.getSearchUsuarioConquistas
)

module.exports = router