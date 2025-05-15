const express = require('express')
const router = express.Router()
const controllerUsuario = require('../controller/usuario/controllerUsuario')

router.post(
    '/post',
    controllerUsuario.postUsuario
)
router.delete(
    '/delete/:idUsuario',
    controllerUsuario.deleteUsuario
)
router.put(
    '/put/:idUsuario',
    controllerUsuario.putUsuario
)
router.put(
    '/login',
    controllerUsuario.putLoginUsuario
)
router.get(
    '/get/getSearchAll',
    controllerUsuario.getSearchAllUsuario
)
router.get(
    '/get/getSearch/:idUsuario',
    controllerUsuario.getSearchUsuario
)

module.exports = router