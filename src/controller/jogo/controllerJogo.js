/*************************************************************************
Objetiv: Controller responsável pela regra de negócio do CRUD do jogo
Data: 24/03/2025
Autor: Mohammmad
Versão: 1.2
************************************************************************/
const servicesJogo = require("../../services/jogo/servicesJogo")
const servicesCarateriticasJogo = require("../../services/jogo/servicesCarateriticasJogo")

async function postJogo (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultJogo = await servicesJogo.inserirJogo(dadosBody, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}
async function getSearchAllJogo(request, response) {
    let resultJogo = await servicesJogo.listarTodosJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}
async function getSearchAllCarateriticas(request, response) {
    let resultJogo = await servicesCarateriticasJogo.listarCarateristicas()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}

async function getSearchJogo(request, response) {
    let idJogo = request.params.idJogo
    let resultJogo = await servicesJogo.buscarJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}

async function deleteJogo (request, response) {
    let idJogo = request.params.idJogo
    let resultJogo = await servicesJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}
async function putJogo(request, response) {
    let idJogo = request.params.idJogo
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultJogo = await servicesJogo.atualizarJogo(dadosBody, idJogo, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
}


module.exports = {
    postJogo,
    putJogo,
    deleteJogo,
    getSearchAllJogo,
    getSearchJogo,
    getSearchAllCarateriticas
}