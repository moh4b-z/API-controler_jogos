const servicesConquistas = require("../../services/conquistas/servicesConquistas")

async function postConquistas (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultConquistas = await servicesConquistas.inserirConquistas(dadosBody, contentType)

    response.status(resultConquistas.status_code)
    response.json(resultConquistas)
}
async function getSearchAllConquistas(request, response) {
    let resultConquistas = await servicesConquistas.listarTodosConquistas()

    response.status(resultConquistas.status_code)
    response.json(resultConquistas)
}

async function getSearchConquistas(request, response) {
    let idConquistas = request.params.idConquistas
    let resultConquistas = await servicesConquistas.buscarConquistas(idConquistas)

    response.status(resultConquistas.status_code)
    response.json(resultConquistas)
}

async function deleteConquistas (request, response) {
    let idConquistas = request.params.idConquistas
    let resultConquistas = await servicesConquistas.excluirConquistas(idConquistas)

    response.status(resultConquistas.status_code)
    response.json(resultConquistas)
}
async function putConquistas(request, response) {
    let idConquistas = request.params.idConquistas
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultConquistas = await servicesConquistas.atualizarConquistas(dadosBody, idConquistas, contentType)

    response.status(resultConquistas.status_code)
    response.json(resultConquistas)
}


module.exports = {
    postConquistas,
    putConquistas,
    deleteConquistas,
    getSearchAllConquistas,
    getSearchConquistas
}