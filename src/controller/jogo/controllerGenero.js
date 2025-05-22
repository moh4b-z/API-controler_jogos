const servicesGenero = require("../../services/jogo/servicesGenero")

async function postGenero (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultGenero = await servicesGenero.inserirGenero(dadosBody, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
}
async function getSearchAllGenero(request, response) {
    let resultGenero = await servicesGenero.listarTodosGenero()

    response.status(resultGenero.status_code)
    response.json(resultGenero)
}

async function getSearchGenero(request, response) {
    let idGenero = request.params.idGenero
    let resultGenero = await servicesGenero.buscarGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
}

async function deleteGenero (request, response) {
    let idGenero = request.params.idGenero
    let resultGenero = await servicesGenero.excluirGenero(idGenero)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
}
async function putGenero(request, response) {
    let idGenero = request.params.idGenero
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultGenero = await servicesGenero.atualizarGenero(dadosBody, idGenero, contentType)

    response.status(resultGenero.status_code)
    response.json(resultGenero)
}


module.exports = {
    postGenero,
    putGenero,
    deleteGenero,
    getSearchAllGenero,
    getSearchGenero
}