const servicesSexo = require("../../services/usuario/servicesSexo")

async function postSexo (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultSexo = await servicesSexo.inserirSexo(dadosBody, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
}
async function getSearchAllSexo(request, response) {
    let resultSexo = await servicesSexo.listarTodosSexo()

    response.status(resultSexo.status_code)
    response.json(resultSexo)
}

async function getSearchSexo(request, response) {
    let idSexo = request.params.idSexo
    let resultSexo = await servicesSexo.buscarSexo(idSexo)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
}

async function deleteSexo (request, response) {
    let idSexo = request.params.idSexo
    let resultSexo = await servicesSexo.excluirSexo(idSexo)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
}
async function putSexo(request, response) {
    let idSexo = request.params.idSexo
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultSexo = await servicesSexo.atualizarSexo(dadosBody, idSexo, contentType)

    response.status(resultSexo.status_code)
    response.json(resultSexo)
}


module.exports = {
    postSexo,
    putSexo,
    deleteSexo,
    getSearchAllSexo,
    getSearchSexo
}