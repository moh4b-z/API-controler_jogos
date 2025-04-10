const servicesTipo_pagamento = require("../../services/servicesTipoPagamento")

async function postTipo_pagamento (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultTipo_pagamento = await servicesTipo_pagamento.inserirTipo_pagamento(dadosBody, contentType)

    response.status(resultTipo_pagamento.status_code)
    response.json(resultTipo_pagamento)
}
async function getSearchAllTipo_pagamento(request, response) {
    let resultTipo_pagamento = await servicesTipo_pagamento.listarTodosTipo_pagamento()

    response.status(resultTipo_pagamento.status_code)
    response.json(resultTipo_pagamento)
}

async function getSearchTipo_pagamento(request, response) {
    let idTipo_pagamento = request.params.idTipo_pagamento
    let resultTipo_pagamento = await servicesTipo_pagamento.buscarTipo_pagamento(idTipo_pagamento)

    response.status(resultTipo_pagamento.status_code)
    response.json(resultTipo_pagamento)
}

async function deleteTipo_pagamento (request, response) {
    let idTipo_pagamento = request.params.idTipo_pagamento
    let resultTipo_pagamento = await servicesTipo_pagamento.excluirTipo_pagamento(idTipo_pagamento)

    response.status(resultTipo_pagamento.status_code)
    response.json(resultTipo_pagamento)
}
async function putTipo_pagamento(request, response) {
    let idTipo_pagamento = request.params.idTipo_pagamento
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultTipo_pagamento = await servicesTipo_pagamento.atualizarTipo_pagamento(dadosBody, idTipo_pagamento, contentType)

    response.status(resultTipo_pagamento.status_code)
    response.json(resultTipo_pagamento)
}


module.exports = {
    postTipo_pagamento,
    putTipo_pagamento,
    deleteTipo_pagamento,
    getSearchAllTipo_pagamento,
    getSearchTipo_pagamento
}