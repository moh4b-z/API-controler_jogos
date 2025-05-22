const servicesJogo_genero = require("../../services/jogo/servicesJogoGenero")

async function postJogo_genero (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultJogo_genero = await servicesJogo_genero.inserirJogo_genero(dadosBody, contentType)

    response.status(resultJogo_genero.status_code)
    response.json(resultJogo_genero)
}
async function getSearchAllJogo_genero(request, response) {
    let resultJogo_genero = await servicesJogo_genero.listarTodosJogo_genero()

    response.status(resultJogo_genero.status_code)
    response.json(resultJogo_genero)
}

async function getSearchJogo_genero(request, response) {
    let idJogo_genero = request.params.idJogo_genero
    let resultJogo_genero = await servicesJogo_genero.buscarJogo_genero(idJogo_genero)

    response.status(resultJogo_genero.status_code)
    response.json(resultJogo_genero)
}

async function deleteJogo_genero (request, response) {
    let idJogo_genero = request.params.idJogo_genero
    let resultJogo_genero = await servicesJogo_genero.excluirJogo_genero(idJogo_genero)

    response.status(resultJogo_genero.status_code)
    response.json(resultJogo_genero)
}
async function putJogo_genero(request, response) {
    let idJogo_genero = request.params.idJogo_genero
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultJogo_genero = await servicesJogo_genero.atualizarJogo_genero(dadosBody, idJogo_genero, contentType)

    response.status(resultJogo_genero.status_code)
    response.json(resultJogo_genero)
}


module.exports = {
    postJogo_genero,
    putJogo_genero,
    deleteJogo_genero,
    getSearchAllJogo_genero,
    getSearchJogo_genero
}