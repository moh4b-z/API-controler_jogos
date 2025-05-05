const express = require('express')
const router = express.Router()
const controllerPublicacaoJogoDoUsuario = require('../controller/publicacaoJogoDoUsuario/controllerPublicacaoJogoDoUsuario')

router.post(
    '/post',
    controllerPublicacaoJogoDoUsuario.postPublicacao
)
router.delete(
    '/delete/:idPublicacao',
    controllerPublicacaoJogoDoUsuario.deletePublicacao
)
router.put(
    '/put/:idPublicacao',
    controllerPublicacaoJogoDoUsuario.putPublicacao
)
router.get(
    '/get/getSearchAll',
    controllerPublicacaoJogoDoUsuario.getSearchAllPublicacao
)
router.get(
    '/get/getSearch/:idPublicacao',
    controllerPublicacaoJogoDoUsuario.getSearchPublicacao
)

module.exports = router