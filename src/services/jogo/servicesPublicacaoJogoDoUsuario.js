const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const DAOjogo = require("../../model/DAO/jogo")
const servicesUsuario = require("../usuario/servicesUsuario")
const publicacaoJogoDaEmpresaDAO = require("../../model/DAO/publicacaoJogoDaEmpresa")

async function inserirPublicacao(Publicacao, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(contentType)
            // console.log(TableCORRECTION.CHECK_tbl_Publicacao(Publicacao))
            
            
            if(TableCORRECTION.CHECK_tbl_publicacao_jogo_do_usuario(Publicacao)){
                if(
                    DAOjogo.selectByIdJogo(Publicacao.id_jogo) && 
                    servicesUsuario.buscarUsuario(Publicacao.id_usuario)
                ){
                    let resultPublicacao = await publicacaoJogoDaEmpresaDAO.insertPublicacao(Publicacao)
                    if (resultPublicacao){
                        return {...MENSAGE.SUCCESS_CEATED_ITEM, Publicacao: resultPublicacao}
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

async function atualizarPublicacao(Publicacao, idPublicacao, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Publicacao);
            // console.log(CORRECTION.verificarAtributosPublicacao(Publicacao));
            // console.log(CORRECTION.CHECK_ID(idPublicacao));
            // console.log((Publicacao));
            // console.log((idPublicacao));
            
            
            if(TableCORRECTION.CHECK_tbl_publicacao_jogo_do_usuario(Publicacao) && CORRECTION.CHECK_ID(idPublicacao)){

                let resultPublicacao = await buscarPublicacao(parseInt(idPublicacao))
                
                

                if(resultPublicacao.status_code == 201){

                    if(
                        DAOjogo.selectByIdJogo(Publicacao.id_jogo) && 
                        servicesUsuario.buscarUsuario(Publicacao.id_usuario)
                    ){
                        Publicacao.id = parseInt(idPublicacao)

                        let result = await publicacaoJogoDaEmpresaDAO.updatePublicacao(Publicacao)
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
                }else if(resultPublicacao.status_code == 404){

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

async function excluirPublicacao(idPublicacao) {
    try { 
        if(CORRECTION.CHECK_ID(idPublicacao)){
            let verification = await publicacaoJogoDaEmpresaDAO.selectByIdPublicacao(parseInt(idPublicacao))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultPublicacao = await publicacaoJogoDaEmpresaDAO.deletePublicacao(parseInt(idPublicacao))
                    return resultPublicacao ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosPublicacao() {
    try {
        let resultPublicacao = await publicacaoJogoDaEmpresaDAO.selectAllPublicacao()

        if(resultPublicacao != false || typeof(resultPublicacao) == 'object'){
            if(resultPublicacao.length > 0){
                let dadosPublicacaos = {
                    "status": true,
                    "status_code": 201,
                    "items": resultPublicacao.length,
                    "publishing_games": resultPublicacao
                }
                return dadosPublicacaos
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

async function buscarPublicacao(idPublicacao) {
    try {
        // console.log(idPublicacao);
        
        if(CORRECTION.CHECK_ID(idPublicacao)){
            let resultPublicacao = await publicacaoJogoDaEmpresaDAO.selectByIdPublicacao(parseInt(idPublicacao))

            if(resultPublicacao != false || typeof(resultPublicacao) == 'object'){
                if(resultPublicacao.length > 0){
                    let dadosPublicacaos = {
                        "status": true,
                        "status_code": 201,
                        "publishing_games": resultPublicacao
                    }
                    return dadosPublicacaos
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
    inserirPublicacao,
    atualizarPublicacao,
    excluirPublicacao,
    listarTodosPublicacao,
    buscarPublicacao
}