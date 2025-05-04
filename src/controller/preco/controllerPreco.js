const servicesPreco = require("../../services/preco/servicesPreco")

async function postPreco (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultPreco = await servicesPreco.inserirPreco(dadosBody, contentType)

    response.status(resultPreco.status_code)
    response.json(resultPreco)
}
async function getSearchAllPreco(request, response) {
    let resultPreco = await servicesPreco.listarTodosPreco()

    response.status(resultPreco.status_code)
    response.json(resultPreco)
}

async function getSearchPreco(request, response) {
    let idPreco = request.params.idPreco
    let resultPreco = await servicesPreco.buscarPreco(idPreco)

    response.status(resultPreco.status_code)
    response.json(resultPreco)
}

async function deletePreco (request, response) {
    let idPreco = request.params.idPreco
    let resultPreco = await servicesPreco.excluirPreco(idPreco)

    response.status(resultPreco.status_code)
    response.json(resultPreco)
}
async function putPreco(request, response) {
    let idPreco = request.params.idPreco
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultPreco = await servicesPreco.atualizarPreco(dadosBody, idPreco, contentType)

    response.status(resultPreco.status_code)
    response.json(resultPreco)
}


module.exports = {
    postPreco,
    putPreco,
    deletePreco,
    getSearchAllPreco,
    getSearchPreco
}