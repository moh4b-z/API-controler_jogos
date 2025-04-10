const servicesPaises = require("../../services/servicesPaises")

async function postPaises (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultPaises = await servicesPaises.inserirPaises(dadosBody, contentType)

    response.status(resultPaises.status_code)
    response.json(resultPaises)
}
async function getSearchAllPaises(request, response) {
    let resultPaises = await servicesPaises.listarTodosPaises()

    response.status(resultPaises.status_code)
    response.json(resultPaises)
}

async function getSearchPaises(request, response) {
    let idPaises = request.params.idPaises
    let resultPaises = await servicesPaises.buscarPaises(idPaises)

    response.status(resultPaises.status_code)
    response.json(resultPaises)
}

async function deletePaises (request, response) {
    let idPaises = request.params.idPaises
    let resultPaises = await servicesPaises.excluirPaises(idPaises)

    response.status(resultPaises.status_code)
    response.json(resultPaises)
}
async function putPaises(request, response) {
    let idPaises = request.params.idPaises
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultPaises = await servicesPaises.atualizarPaises(dadosBody, idPaises, contentType)

    response.status(resultPaises.status_code)
    response.json(resultPaises)
}


module.exports = {
    postPaises,
    putPaises,
    deletePaises,
    getSearchAllPaises,
    getSearchPaises
}