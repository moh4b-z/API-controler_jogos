/*************************************************************************
Objetiv: Arquivo de padronização de mensagens e status code para o projeto
Data: 13/02/2025
Autor: Mohammmad
Versão: 1.0
************************************************************************/


/************************* MENSAGENS DE ERRO *************************/

const ERROR_REQUIRED_FIELDS = {
    status: false,
    status_code: 400,
    messagem: "Campo obrigatorio não colocado, ou ultrapassagem de cariteres"
}
const ERROR_NOT_FOUND = {
    status: false,
    status_code: 404,
    messagem: "Conteudo não Encontrado para retornar"
}
const ERROR_CONTENT_TYPE = {
    status: false,
    status_code: 415,
    messagem: "Não foi possivel processar a requisição, pois, o formato de dados encaminhado não surpotado pelo servidor. Favor encaminhar apenas json."
}

const ERROR_INTERNAL_SERVER_MODEL = {
    status: false,
    status_code: 500,
    messagem: "Não foi possivel processar a requisição, pois ocoreram erros internos na model"
}
const ERROR_INTERNAL_SERVER_CONTROLLER = {
    status: false,
    status_code: 500,
    messagem: "Não foi possivel processar a requisição, pois ocoreram erros internos no controller"
}


/************************* MENSAGENS DE SUCESSO *************************/

const SUCCVESS_CEATED_ITEM = {
    status: true,
    status_code: 201,
    messagem: "Jogo inserido no banco"
}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    SUCCVESS_CEATED_ITEM,
    ERROR_INTERNAL_SERVER_MODEL,
    ERROR_INTERNAL_SERVER_CONTROLLER,
    ERROR_CONTENT_TYPE,
    ERROR_NOT_FOUND
}