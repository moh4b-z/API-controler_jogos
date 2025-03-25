/*************************************************************************
Objetiv: Controller responsável pela regra de negócio do CRUD do jogo
Data: 24/03/2025
Autor: Mohammmad
Versão: 1.2
************************************************************************/
const servicesJogo = require("../../services/servicesJogo")


async function postInserirJogo (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultJogo = await servicesJogo.inserirJogo(dadosBody, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}
async function getListarTodosJogo(request, response) {
    let resultJogo = await servicesJogo.listarTodosJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}

async function getBuscarJogo(request, response) {
    let idJogo = request.params.idJogo
    let resultJogo = await servicesJogo.buscarJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}

async function deleteExcluirJogo (request, response) {
    let idJogo = request.params.idJogo
    let resultJogo = await servicesJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}
async function putAtualizarJogo(request, response) {
    let idJogo = request.params.idJogo
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultJogo = await servicesJogo.atualizarJogo(dadosBody, idJogo, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}


module.exports = {
    postInserirJogo,
    putAtualizarJogo,
    deleteExcluirJogo,
    getListarTodosJogo,
    getBuscarJogo
}