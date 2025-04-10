const servicesPlataforma = require("../../services/servicesPlataforma")

async function postPlataforma (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultPlataforma = await servicesPlataforma.inserirPlataforma(dadosBody, contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
}
async function getSearchAllPlataforma(request, response) {
    let resultPlataforma = await servicesPlataforma.listarTodosPlataforma()

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
}

async function getSearchPlataforma(request, response) {
    let idPlataforma = request.params.idPlataforma
    let resultPlataforma = await servicesPlataforma.buscarPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
}

async function deletePlataforma (request, response) {
    let idPlataforma = request.params.idPlataforma
    let resultPlataforma = await servicesPlataforma.excluirPlataforma(idPlataforma)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
}
async function putPlataforma(request, response) {
    let idPlataforma = request.params.idPlataforma
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultPlataforma = await servicesPlataforma.atualizarPlataforma(dadosBody, idPlataforma, contentType)

    response.status(resultPlataforma.status_code)
    response.json(resultPlataforma)
}


module.exports = {
    postPlataforma,
    putPlataforma,
    deletePlataforma,
    getSearchAllPlataforma,
    getSearchPlataforma
}