const servicesPublicacaoJogoDaEmpresa = require("../../services/jogo/servicesPublicacaoJogoDaEmpresa")

async function postPublicacao (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultPublicacao = await servicesPublicacaoJogoDaEmpresa.inserirPublicacao(dadosBody, contentType)

    response.status(resultPublicacao.status_code)
    response.json(resultPublicacao)
}
async function getSearchAllPublicacao(request, response) {
    let resultPublicacao = await servicesPublicacaoJogoDaEmpresa.listarTodosPublicacao()

    response.status(resultPublicacao.status_code)
    response.json(resultPublicacao)
}

async function getSearchPublicacao(request, response) {
    let idPublicacao = request.params.idPublicacao
    let resultPublicacao = await servicesPublicacaoJogoDaEmpresa.buscarPublicacao(idPublicacao)

    response.status(resultPublicacao.status_code)
    response.json(resultPublicacao)
}

async function deletePublicacao (request, response) {
    let idPublicacao = request.params.idPublicacao
    let resultPublicacao = await servicesPublicacaoJogoDaEmpresa.excluirPublicacao(idPublicacao)

    response.status(resultPublicacao.status_code)
    response.json(resultPublicacao)
}
async function putPublicacao(request, response) {
    let idPublicacao = request.params.idPublicacao
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultPublicacao = await servicesPublicacaoJogoDaEmpresa.atualizarPublicacao(dadosBody, idPublicacao, contentType)

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