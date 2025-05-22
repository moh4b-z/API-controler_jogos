const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const servicesJogo = require("./servicesJogo")
const servicesPlataforma = require("../plataforma/servicesPlataforma")
const jogo_plataformaDAO = require("../../model/DAO/jogoPlataforma")
// const { log } = require("console")

async function inserirJogo_plataforma(Jogo_plataforma, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Jogo_plataforma)
            // console.log(TableCORRECTION.CHECK_tbl_jogo_plataforma(Jogo_plataforma))
            
            
            if(TableCORRECTION.CHECK_tbl_jogo_plataforma(Jogo_plataforma)){
                if(servicesJogo.buscarJogo(Jogo_plataforma.id_jogo) && servicesPlataforma.buscarPlataforma(Jogo_plataforma.id_plataforma)){
                    let resultJogo_plataforma = await jogo_plataformaDAO.insertJogo_plataforma(Jogo_plataforma)
                    if (resultJogo_plataforma){
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

async function atualizarJogo_plataforma(Jogo_plataforma, idJogo_plataforma, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Jogo_plataforma);
            // console.log(CORRECTION.verificarAtributosJogo_plataforma(Jogo_plataforma));
            // console.log(CORRECTION.CHECK_ID(idJogo_plataforma));
            // console.log((Jogo_plataforma));
            // console.log((idJogo_plataforma));
            
            
            if(TableCORRECTION.CHECK_tbl_jogo_plataforma(Jogo_plataforma) && CORRECTION.CHECK_ID(idJogo_plataforma)){

                let resultJogo_plataforma = await buscarJogo_plataforma(parseInt(idJogo_plataforma))
                
                

                if(resultJogo_plataforma.status_code == 201){

                    if(
                        servicesJogo.buscarJogo(Jogo_plataforma.id_jogo) && 
                        servicesPlataforma.buscarPlataforma(Jogo_plataforma.id_plataforma)
                    ){
                        Jogo_plataforma.id = parseInt(idJogo_plataforma)

                        let result = await jogo_plataformaDAO.updateJogo_plataforma(Jogo_plataforma)
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
                }else if(resultJogo_plataforma.status_code == 404){

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

async function excluirJogo_plataforma(idJogo_plataforma) {
    try { 
        if(CORRECTION.CHECK_ID(idJogo_plataforma)){
            let verification = await jogo_plataformaDAO.selectByIdJogo_plataforma(parseInt(idJogo_plataforma))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultJogo_plataforma = await jogo_plataformaDAO.deleteJogo_plataforma(parseInt(idJogo_plataforma))
                    return resultJogo_plataforma ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosJogo_plataforma() {
    try {
        let resultJogo_plataforma = await jogo_plataformaDAO.selectAllJogo_plataforma()

        if(resultJogo_plataforma != false || typeof(resultJogo_plataforma) == 'object'){
            if(resultJogo_plataforma.length > 0){
                let dadosJogo_plataformas = {
                    "status": true,
                    "status_code": 201,
                    "items": resultJogo_plataforma.length,
                    "game_platform": resultJogo_plataforma
                }
                return dadosJogo_plataformas
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

async function buscarJogo_plataforma(idJogo_plataforma) {
    try {
        // console.log(idJogo_plataforma);
        
        if(CORRECTION.CHECK_ID(idJogo_plataforma)){
            let resultJogo_plataforma = await jogo_plataformaDAO.selectByIdJogo_plataforma(parseInt(idJogo_plataforma))

            if(resultJogo_plataforma != false || typeof(resultJogo_plataforma) == 'object'){
                if(resultJogo_plataforma.length > 0){
                    let dadosJogo_plataformas = {
                        "status": true,
                        "status_code": 201,
                        "game_platform": resultJogo_plataforma
                    }
                    return dadosJogo_plataformas
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
    inserirJogo_plataforma,
    atualizarJogo_plataforma,
    excluirJogo_plataforma,
    listarTodosJogo_plataforma,
    buscarJogo_plataforma
}