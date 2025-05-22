const servicesUsuarioConquistas = require("../../services/usuario/servicesUsuarioConquistas")

async function postUsuarioConquistas (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultUsuarioConquistas = await servicesUsuarioConquistas.inserirUsuarioConquistas(dadosBody, contentType)

    response.status(resultUsuarioConquistas.status_code)
    response.json(resultUsuarioConquistas)
}
async function getSearchAllUsuarioConquistas(request, response) {
    let resultUsuarioConquistas = await servicesUsuarioConquistas.listarTodosUsuarioConquistas()

    response.status(resultUsuarioConquistas.status_code)
    response.json(resultUsuarioConquistas)
}

async function getSearchUsuarioConquistas(request, response) {
    let idUsuarioConquistas = request.params.idUsuarioConquistas
    let resultUsuarioConquistas = await servicesUsuarioConquistas.buscarUsuarioConquistas(idUsuarioConquistas)

    response.status(resultUsuarioConquistas.status_code)
    response.json(resultUsuarioConquistas)
}

async function deleteUsuarioConquistas (request, response) {
    let idUsuarioConquistas = request.params.idUsuarioConquistas
    let resultUsuarioConquistas = await servicesUsuarioConquistas.excluirUsuarioConquistas(idUsuarioConquistas)

    response.status(resultUsuarioConquistas.status_code)
    response.json(resultUsuarioConquistas)
}
async function putUsuarioConquistas(request, response) {
    let idUsuarioConquistas = request.params.idUsuarioConquistas
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultUsuarioConquistas = await servicesUsuarioConquistas.atualizarUsuarioConquistas(dadosBody, idUsuarioConquistas, contentType)

    response.status(resultUsuarioConquistas.status_code)
    response.json(resultUsuarioConquistas)
}


module.exports = {
    postUsuarioConquistas,
    putUsuarioConquistas,
    deleteUsuarioConquistas,
    getSearchAllUsuarioConquistas,
    getSearchUsuarioConquistas
}