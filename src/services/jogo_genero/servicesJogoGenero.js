const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const servicesJogo = require("../jogo/servicesJogo")
const jogo_generoDAO = require("../../model/DAO/jogoGenero")
// const { log } = require("console")

async function inserirJogo_genero(Jogo_genero, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Jogo_genero)
            // console.log(TableCORRECTION.CHECK_tbl_jogo_genero(Jogo_genero))
            
            
            if(TableCORRECTION.CHECK_tbl_jogo_genero(Jogo_genero)){
                if(servicesJogo.buscarJogo(Jogo_genero.id_jogo_principal) && servicesJogo.buscarJogo(Jogo_genero.id_jogo_Jogo_genero)){
                    let resultJogo_genero = await jogo_generoDAO.insertJogo_genero(Jogo_genero)
                    if (resultJogo_genero){
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

async function atualizarJogo_genero(Jogo_genero, idJogo_genero, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Jogo_genero);
            // console.log(CORRECTION.verificarAtributosJogo_genero(Jogo_genero));
            // console.log(CORRECTION.CHECK_ID(idJogo_genero));
            // console.log((Jogo_genero));
            // console.log((idJogo_genero));
            
            
            if(TableCORRECTION.CHECK_tbl_jogo_genero(Jogo_genero) && CORRECTION.CHECK_ID(idJogo_genero)){

                let resultJogo_genero = await buscarJogo_genero(parseInt(idJogo_genero))
                
                

                if(resultJogo_genero.status_code == 201){

                    if(
                        servicesJogo.buscarJogo(Jogo_genero.id_jogo_principal) && 
                        servicesJogo.buscarJogo(Jogo_genero.id_jogo_Jogo_genero)
                    ){
                        Jogo_genero.id = parseInt(idJogo_genero)

                        let result = await jogo_generoDAO.updateJogo_genero(Jogo_genero)
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
                }else if(resultJogo_genero.status_code == 404){

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

async function excluirJogo_genero(idJogo_genero) {
    try { 
        if(CORRECTION.CHECK_ID(idJogo_genero)){
            let verification = await jogo_generoDAO.selectByIdJogo_genero(parseInt(idJogo_genero))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultJogo_genero = await jogo_generoDAO.deleteJogo_genero(parseInt(idJogo_genero))
                    return resultJogo_genero ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosJogo_genero() {
    try {
        let resultJogo_genero = await jogo_generoDAO.selectAllJogo_genero()

        if(resultJogo_genero != false || typeof(resultJogo_genero) == 'object'){
            if(resultJogo_genero.length > 0){
                let dadosJogo_generos = {
                    "status": true,
                    "status_code": 201,
                    "items": resultJogo_genero.length,
                    "Jogo_generos": resultJogo_genero
                }
                return dadosJogo_generos
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

async function buscarJogo_genero(idJogo_genero) {
    try {
        // console.log(idJogo_genero);
        
        if(CORRECTION.CHECK_ID(idJogo_genero)){
            let resultJogo_genero = await jogo_generoDAO.selectByIdJogo_genero(parseInt(idJogo_genero))

            if(resultJogo_genero != false || typeof(resultJogo_genero) == 'object'){
                if(resultJogo_genero.length > 0){
                    let dadosJogo_generos = {
                        "status": true,
                        "status_code": 201,
                        "sex": resultJogo_genero
                    }
                    return dadosJogo_generos
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
    inserirJogo_genero,
    atualizarJogo_genero,
    excluirJogo_genero,
    listarTodosJogo_genero,
    buscarJogo_genero
}