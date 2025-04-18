const express = require('express')
const router = express.Router()
const controllerDlc = require('../controller/dlc/controllerDlc')

router.post(
    '/post',
    controllerDlc.postDlc
)
router.delete(
    '/delete/:idDlc',
    controllerDlc.deleteDlc
)
router.put(
    '/put/:idDlc',
    controllerDlc.putDlc
)
router.get(
    '/get/getSearchAllDlc',
    controllerDlc.getSearchAllDlc
)
router.get(
    '/get/getSearchDlc/:idDlc',
    controllerDlc.getSearchDlc
)

module.exports = router