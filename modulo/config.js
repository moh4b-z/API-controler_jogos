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

const ERROR_INTERNAL_SERVER = {
    status: false,
    status_code: 500,
    messagem: "Não foi possivel processar a requisição, pois ocoreram erros internos no servidor"
}



/************************* MENSAGENS DE SUCESSO *************************/

const SUCCVESS_CEATED_ITEM = {
    status: false,
    status_code: 200,
    messagem: "Campo obrigatorio não colocado, ou ultrapassagem de cariteres"
}

module.exports = {
    ERROR_REQUIRED_FIELDS,
    SUCCVESS_CEATED_ITEM,
    ERROR_INTERNAL_SERVER
}