const express = require('express')
const router = express.Router()
const controllerPublicacaoJogoDaEmpresa = require('../controller/publicacaoJogoDaEmpresa/controllerPublicacaoJogoDaEmpresaJogoDaEmpresa')

router.post(
    '/post',
    controllerPublicacaoJogoDaEmpresa.postPublicacao
)
router.delete(
    '/delete/:idPublicacao',
    controllerPublicacaoJogoDaEmpresa.deletePublicacao
)
router.put(
    '/put/:idPublicacao',
    controllerPublicacaoJogoDaEmpresa.putPublicacao
)
router.get(
    '/get/getSearchAll',
    controllerPublicacaoJogoDaEmpresa.getSearchAllPublicacao
)
router.get(
    '/get/getSearch/:idPublicacao',
    controllerPublicacaoJogoDaEmpresa.getSearchPublicacao
)

module.exports = router