const express = require('express')
const router = express.Router()
const controllerSexo = require('../controller/usuario/controllerSexo')

router.post(
    '/post',
    controllerSexo.postSexo
)
router.delete(
    '/delete/:idSexo',
    controllerSexo.deleteSexo
)
router.put(
    '/put/:idSexo',
    controllerSexo.putSexo
)
router.get(
    '/get/getSearchAll',
    controllerSexo.getSearchAllSexo
)
router.get(
    '/get/getSearch/:idSexo',
    controllerSexo.getSearchSexo
)

module.exports = router