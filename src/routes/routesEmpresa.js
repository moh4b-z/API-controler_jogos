const express = require('express')
const router = express.Router()
const controllerEmpresa = require('../controller/empresa/controllerEmpresa')

router.post(
    '/post',
    controllerEmpresa.postEmpresa
)
router.delete(
    '/delete/:idEmpresa',
    controllerEmpresa.deleteEmpresa
)
router.put(
    '/put/:idEmpresa',
    controllerEmpresa.putEmpresa
)
router.put(
    '/login',
    controllerEmpresa.putLoginEmpresa
)
router.get(
    '/get/getSearchAll',
    controllerEmpresa.getSearchAllEmpresa
)
router.get(
    '/get/getSearch/:idEmpresa',
    controllerEmpresa.getSearchEmpresa
)

module.exports = router