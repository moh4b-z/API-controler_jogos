const servicesPublicacaoJogoDoUsuario = require("../../services/publicacaoJogoDoUsuario/servicesPublicacaoJogoDoUsuario")

async function postPublicacao (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultPublicacao = await servicesPublicacaoJogoDoUsuario.inserirPublicacao(dadosBody, contentType)

    response.status(resultPublicacao.status_code)
    response.json(resultPublicacao)
}
async function getSearchAllPublicacao(request, response) {
    let resultPublicacao = await servicesPublicacaoJogoDoUsuario.listarTodosPublicacao()

    response.status(resultPublicacao.status_code)
    response.json(resultPublicacao)
}

async function getSearchPublicacao(request, response) {
    let idPublicacao = request.params.idPublicacao
    let resultPublicacao = await servicesPublicacaoJogoDoUsuario.buscarPublicacao(idPublicacao)

    response.status(resultPublicacao.status_code)
    response.json(resultPublicacao)
}

async function deletePublicacao (request, response) {
    let idPublicacao = request.params.idPublicacao
    let resultPublicacao = await servicesPublicacaoJogoDoUsuario.excluirPublicacao(idPublicacao)

    response.status(resultPublicacao.status_code)
    response.json(resultPublicacao)
}
async function putPublicacao(request, response) {
    let idPublicacao = request.params.idPublicacao
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultPublicacao = await servicesPublicacaoJogoDoUsuario.atualizarPublicacao(dadosBody, idPublicacao, contentType)

    response.status(resultPublicacao.status_code)
    response.json(resultPublicacao)
}


module.exports = {
    postPublicacao,
    putPublicacao,
    deletePublicacao,
    getSearchAllPublicacao,
    getSearchPublicacao
}