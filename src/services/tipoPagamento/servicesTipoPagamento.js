const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")

const tipo_pagamentoDAO = require("../../model/DAO/tipoPagamento")
// const { log } = require("console")

async function inserirTipo_pagamento(Tipo_pagamento, contentType) {
    try {
        if(contentType == "application/json"){
            if(CORRECTION.CHECK_tbl_tipo_pagamento(Tipo_pagamento)){
                let resultTipo_pagamento = await tipo_pagamentoDAO.insertTipo_pagamento(Tipo_pagamento)
                if (resultTipo_pagamento){
                    return MENSAGE.SUCCESS_CEATED_ITEM
                }else{
                    return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
                
            }else{
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        }else{
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        // console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
    
    
}

async function atualizarTipo_pagamento(Tipo_pagamento, idTipo_pagamento, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Tipo_pagamento);
            // console.log(CORRECTION.verificarAtributosTipo_pagamento(Tipo_pagamento));
            // console.log(CORRECTION.CHECK_ID(idTipo_pagamento));
            // console.log(CORRECTION.CHECK_tbl_tipo_pagamento(Tipo_pagamento));
            // console.log(CORRECTION.CHECK_ID(idTipo_pagamento));
            
            
            if(CORRECTION.CHECK_tbl_tipo_pagamento(Tipo_pagamento) && CORRECTION.CHECK_ID(idTipo_pagamento)){

                let resultTipo_pagamento = await buscarTipo_pagamento(parseInt(idTipo_pagamento))
                
                

                if(resultTipo_pagamento.status_code == 201){

                    Tipo_pagamento.id = parseInt(idTipo_pagamento)
                    

                    let result = await tipo_pagamentoDAO.updateTipo_pagamento(Tipo_pagamento)
                    // console.log(result)
                    
                    if(result){
                        return MENSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultTipo_pagamento.status_code == 404){

                    return MENSAGE.ERROR_NOT_FOUND
                }else{
                    
                    
                    return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
                }
                
            }else{
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }
        }else{

            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function excluirTipo_pagamento(idTipo_pagamento) {
    try { 
        if(CORRECTION.CHECK_ID(idTipo_pagamento)){
            let verification = await tipo_pagamentoDAO.selectByIdTipo_pagamento(parseInt(idTipo_pagamento))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultTipo_pagamento = await tipo_pagamentoDAO.deleteTipo_pagamento(parseInt(idTipo_pagamento))
                    return resultTipo_pagamento ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
                }else{
                    return MENSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
        
        
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function listarTodosTipo_pagamento() {
    try {
        let resultTipo_pagamento = await tipo_pagamentoDAO.selectAllTipo_pagamento()

        if(resultTipo_pagamento != false || typeof(resultTipo_pagamento) == 'object'){
            if(resultTipo_pagamento.length > 0){
                let dadosTipo_pagamentos = {
                    "status": true,
                    "status_code": 201,
                    "items": resultTipo_pagamento.length,
                    "typesOfPayments": resultTipo_pagamento
                }
                return dadosTipo_pagamentos
            }else{
                return MENSAGE.ERROR_NOT_FOUND
            }
        }else{
            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
        
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function buscarTipo_pagamento(idTipo_pagamento) {
    try {
        // console.log(idTipo_pagamento);
        
        if(CORRECTION.CHECK_ID(idTipo_pagamento)){
            let resultTipo_pagamento = await tipo_pagamentoDAO.selectByIdTipo_pagamento(parseInt(idTipo_pagamento))

            if(resultTipo_pagamento != false || typeof(resultTipo_pagamento) == 'object'){
                if(resultTipo_pagamento.length > 0){
                    let dadosTipo_pagamentos = {
                        "status": true,
                        "status_code": 201,
                        "typeOfPayments": resultTipo_pagamento
                    }
                    return dadosTipo_pagamentos
                }else{
                    return MENSAGE.ERROR_NOT_FOUND
                }
            }else{
                return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
            }
        }else{
            return MENSAGE.ERROR_REQUIRED_FIELDS
        }
        
        
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}



module.exports = {
    inserirTipo_pagamento,
    atualizarTipo_pagamento,
    excluirTipo_pagamento,
    listarTodosTipo_pagamento,
    buscarTipo_pagamento
}