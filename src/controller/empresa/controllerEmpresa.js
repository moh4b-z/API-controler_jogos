const servicesEmpresa = require("../../services/empresa/servicesEmpresa")

async function postEmpresa (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultEmpresa = await servicesEmpresa.inserirEmpresa(dadosBody, contentType)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
}
async function getSearchAllEmpresa(request, response) {
    let resultEmpresa = await servicesEmpresa.listarTodosEmpresa()

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
}

async function getSearchEmpresa(request, response) {
    let idEmpresa = request.params.idEmpresa
    let resultEmpresa = await servicesEmpresa.buscarEmpresa(idEmpresa)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
}

async function deleteEmpresa (request, response) {
    let idEmpresa = request.params.idEmpresa
    let resultEmpresa = await servicesEmpresa.excluirEmpresa(idEmpresa)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
}
async function putEmpresa(request, response) {
    let idEmpresa = request.params.idEmpresa
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultEmpresa = await servicesEmpresa.atualizarEmpresa(dadosBody, idEmpresa, contentType)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
}

async function putLoginEmpresa(request, response) {
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultEmpresa = await servicesEmpresa.loginEmpresa(dadosBody, contentType)

    response.status(resultEmpresa.status_code)
    response.json(resultEmpresa)
}


module.exports = {
    postEmpresa,
    putEmpresa,
    deleteEmpresa,
    getSearchAllEmpresa,
    getSearchEmpresa,
    putLoginEmpresa
}