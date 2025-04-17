const servicesDlc = require("../../services/servicesDlc")

async function postDlc (request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultDlc = await servicesDlc.inserirDlc(dadosBody, contentType)

    response.status(resultDlc.status_code)
    response.json(resultDlc)
}
async function getSearchAllDlc(request, response) {
    let resultDlc = await servicesDlc.listarTodosDlc()

    response.status(resultDlc.status_code)
    response.json(resultDlc)
}

async function getSearchDlc(request, response) {
    let idDlc = request.params.idDlc
    let resultDlc = await servicesDlc.buscarDlc(idDlc)

    response.status(resultDlc.status_code)
    response.json(resultDlc)
}

async function deleteDlc (request, response) {
    let idDlc = request.params.idDlc
    let resultDlc = await servicesDlc.excluirDlc(idDlc)

    response.status(resultDlc.status_code)
    response.json(resultDlc)
}
async function putDlc(request, response) {
    let idDlc = request.params.idDlc
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultDlc = await servicesDlc.atualizarDlc(dadosBody, idDlc, contentType)

    response.status(resultDlc.status_code)
    response.json(resultDlc)
}


module.exports = {
    postDlc,
    putDlc,
    deleteDlc,
    getSearchAllDlc,
    getSearchDlc
}