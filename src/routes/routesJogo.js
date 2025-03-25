const express = require('express')
const router = express.Router()
const controllerJogo = require('../controller/jogo/controllerJogo')

router.post(
    '/',
    controllerJogo.postInserirJogo
)
router.delete(
    '/deletar/:idJogo',
    controllerJogo.deleteExcluirJogo
)
router.put(
    '/atualizar/:idJogo',
    controllerJogo.putAtualizarJogo
)
router.get(
    '/listar',
    controllerJogo.getListarTodosJogo
)
router.get(
    '/listar/:idJogo',
    controllerJogo.getBuscarJogo
)

module.exports = router