const express = require('express')
const router = express.Router()
const controllerTipo_pagamento = require('../controller/tipoPagamento/controllerTipoPagamento')

router.post(
    '/post',
    controllerTipo_pagamento.postTipo_pagamento
)
router.delete(
    '/delete/:idTipo_pagamento',
    controllerTipo_pagamento.deleteTipo_pagamento
)
router.put(
    '/put/:idTipo_pagamento',
    controllerTipo_pagamento.putTipo_pagamento
)
router.get(
    '/get/getSearchAllTipo_pagamento',
    controllerTipo_pagamento.getSearchAllTipo_pagamento
)
router.get(
    '/get/getSearchTipo_pagamento/:idTipo_pagamento',
    controllerTipo_pagamento.getSearchTipo_pagamento
)

module.exports = router