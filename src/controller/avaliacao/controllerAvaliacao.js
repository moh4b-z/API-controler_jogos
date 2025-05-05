const servicesAvaliacao = require("../../services/avaliacao/servicesAvaliacao")

async function postAvaliacao (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultAvaliacao = await servicesAvaliacao.inserirAvaliacao(dadosBody, contentType)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
}
async function getSearchAllAvaliacao(request, response) {
    let resultAvaliacao = await servicesAvaliacao.listarTodosAvaliacao()

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
}

async function getSearchAvaliacao(request, response) {
    let idAvaliacao = request.params.idAvaliacao
    let resultAvaliacao = await servicesAvaliacao.buscarAvaliacao(idAvaliacao)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
}

async function deleteAvaliacao (request, response) {
    let idAvaliacao = request.params.idAvaliacao
    let resultAvaliacao = await servicesAvaliacao.excluirAvaliacao(idAvaliacao)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
}
async function putAvaliacao(request, response) {
    let idAvaliacao = request.params.idAvaliacao
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultAvaliacao = await servicesAvaliacao.atualizarAvaliacao(dadosBody, idAvaliacao, contentType)

    response.status(resultAvaliacao.status_code)
    response.json(resultAvaliacao)
}


module.exports = {
    postAvaliacao,
    putAvaliacao,
    deleteAvaliacao,
    getSearchAllAvaliacao,
    getSearchAvaliacao
}