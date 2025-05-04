const servicesJogo_plataforma = require("../../services/jogo_plataforma/servicesJogoPlataforma")

async function postJogo_plataforma (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultJogo_plataforma = await servicesJogo_plataforma.inserirJogo_plataforma(dadosBody, contentType)

    response.status(resultJogo_plataforma.status_code)
    response.json(resultJogo_plataforma)
}
async function getSearchAllJogo_plataforma(request, response) {
    let resultJogo_plataforma = await servicesJogo_plataforma.listarTodosJogo_plataforma()

    response.status(resultJogo_plataforma.status_code)
    response.json(resultJogo_plataforma)
}

async function getSearchJogo_plataforma(request, response) {
    let idJogo_plataforma = request.params.idJogo_plataforma
    let resultJogo_plataforma = await servicesJogo_plataforma.buscarJogo_plataforma(idJogo_plataforma)

    response.status(resultJogo_plataforma.status_code)
    response.json(resultJogo_plataforma)
}

async function deleteJogo_plataforma (request, response) {
    let idJogo_plataforma = request.params.idJogo_plataforma
    let resultJogo_plataforma = await servicesJogo_plataforma.excluirJogo_plataforma(idJogo_plataforma)

    response.status(resultJogo_plataforma.status_code)
    response.json(resultJogo_plataforma)
}
async function putJogo_plataforma(request, response) {
    let idJogo_plataforma = request.params.idJogo_plataforma
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultJogo_plataforma = await servicesJogo_plataforma.atualizarJogo_plataforma(dadosBody, idJogo_plataforma, contentType)

    response.status(resultJogo_plataforma.status_code)
    response.json(resultJogo_plataforma)
}


module.exports = {
    postJogo_plataforma,
    putJogo_plataforma,
    deleteJogo_plataforma,
    getSearchAllJogo_plataforma,
    getSearchJogo_plataforma
}