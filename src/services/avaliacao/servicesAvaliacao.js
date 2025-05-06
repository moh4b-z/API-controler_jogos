const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const servicesJogo = require("../jogo/servicesJogo")
const servicesUsuario = require("../usuario/servicesUsuario")
const AvaliacaoDAO = require("../../model/DAO/avaliacao")
// const { log } = require("console")

async function inserirAvaliacao(Avaliacao, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Avaliacao)
            // console.log(TableCORRECTION.CHECK_tbl_avaliacao(Avaliacao))
            
            
            if(TableCORRECTION.CHECK_tbl_avaliacao(Avaliacao)){
                if(
                    servicesJogo.buscarJogo(Avaliacao.id_jogo) && 
                    servicesUsuario.buscarUsuario(Avaliacao.id_usuario)
                ){
                    let resultAvaliacao = await AvaliacaoDAO.insertAvaliacao(Avaliacao)
                    if (resultAvaliacao){
                        return MENSAGE.SUCCESS_CEATED_ITEM
                    }else{
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                }else{
                    return MENSAGE.ERROR_NOT_FOUND_FOREIGN_KEY
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

async function atualizarAvaliacao(Avaliacao, idAvaliacao, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Avaliacao);
            // console.log(CORRECTION.verificarAtributosAvaliacao(Avaliacao));
            // console.log(CORRECTION.CHECK_ID(idAvaliacao));
            // console.log((Avaliacao));
            // console.log((idAvaliacao));
            
            
            if(
                TableCORRECTION.CHECK_tbl_avaliacao(Avaliacao) && 
                CORRECTION.CHECK_ID(idAvaliacao)
            ){
                let resultAvaliacao = await buscarAvaliacao(parseInt(idAvaliacao))

                if(resultAvaliacao.status_code == 201){
                    if(
                        servicesJogo.buscarJogo(Avaliacao.id_jogo) && 
                        servicesUsuario.buscarUsuario(Avaliacao.id_usuario)
                    ){
                        Avaliacao.id = parseInt(idAvaliacao)

                        let result = await AvaliacaoDAO.updateAvaliacao(Avaliacao)
                        // console.log(result)
                        
                        if(result){
                            return MENSAGE.SUCCESS_UPDATED_ITEM
                        }else{
                            console.log(result);
                            
                            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                        }
                    }else{
                        return MENSAGE.ERROR_NOT_FOUND_FOREIGN_KEY
                    }
                }else if(resultAvaliacao.status_code == 404){

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

async function excluirAvaliacao(idAvaliacao) {
    try { 
        if(CORRECTION.CHECK_ID(idAvaliacao)){
            let verification = await AvaliacaoDAO.selectByIdAvaliacao(parseInt(idAvaliacao))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultAvaliacao = await AvaliacaoDAO.deleteAvaliacao(parseInt(idAvaliacao))
                    return resultAvaliacao ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosAvaliacao() {
    try {
        let resultAvaliacao = await AvaliacaoDAO.selectAllAvaliacao()

        if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
            if(resultAvaliacao.length > 0){
                let dadosAvaliacaos = {
                    "status": true,
                    "status_code": 201,
                    "items": resultAvaliacao.length,
                    "game_genres": resultAvaliacao
                }
                return dadosAvaliacaos
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

async function buscarAvaliacao(idAvaliacao) {
    try {
        // console.log(idAvaliacao);
        
        if(CORRECTION.CHECK_ID(idAvaliacao)){
            let resultAvaliacao = await AvaliacaoDAO.selectByIdAvaliacao(parseInt(idAvaliacao))

            if(resultAvaliacao != false || typeof(resultAvaliacao) == 'object'){
                if(resultAvaliacao.length > 0){
                    let dadosAvaliacaos = {
                        "status": true,
                        "status_code": 201,
                        "sex": resultAvaliacao
                    }
                    return dadosAvaliacaos
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
    inserirAvaliacao,
    atualizarAvaliacao,
    excluirAvaliacao,
    listarTodosAvaliacao,
    buscarAvaliacao
}