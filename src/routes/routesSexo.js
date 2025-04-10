const express = require('express')
const router = express.Router()
const controllerSexo = require('../controller/sexo/controllerSexo')

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
    '/get/getSearchAllSexo',
    controllerSexo.getSearchAllSexo
)
router.get(
    '/get/getSearchSexo/:idSexo',
    controllerSexo.getSearchSexo
)

module.exports = router