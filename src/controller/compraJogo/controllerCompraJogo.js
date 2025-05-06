const servicesCompraJogo = require("../../services/compraJogo/servicesCompraJogo")

async function postCompraJogo (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultCompraJogo = await servicesCompraJogo.inserirCompraJogo(dadosBody, contentType)

    response.status(resultCompraJogo.status_code)
    response.json(resultCompraJogo)
}
async function getSearchAllCompraJogo(request, response) {
    let resultCompraJogo = await servicesCompraJogo.listarTodosCompraJogo()

    response.status(resultCompraJogo.status_code)
    response.json(resultCompraJogo)
}

async function getSearchCompraJogo(request, response) {
    let idCompraJogo = request.params.idCompraJogo
    let resultCompraJogo = await servicesCompraJogo.buscarCompraJogo(idCompraJogo)

    response.status(resultCompraJogo.status_code)
    response.json(resultCompraJogo)
}

async function deleteCompraJogo (request, response) {
    let idCompraJogo = request.params.idCompraJogo
    let resultCompraJogo = await servicesCompraJogo.excluirCompraJogo(idCompraJogo)

    response.status(resultCompraJogo.status_code)
    response.json(resultCompraJogo)
}
async function putCompraJogo(request, response) {
    let idCompraJogo = request.params.idCompraJogo
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultCompraJogo = await servicesCompraJogo.atualizarCompraJogo(dadosBody, idCompraJogo, contentType)

    response.status(resultCompraJogo.status_code)
    response.json(resultCompraJogo)
}


module.exports = {
    postCompraJogo,
    putCompraJogo,
    deleteCompraJogo,
    getSearchAllCompraJogo,
    getSearchCompraJogo
}