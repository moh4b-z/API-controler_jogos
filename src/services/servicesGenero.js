const MENSAGE = require("../modulo/config")
const CORRECTION = require("../utils/inputCheck")

const generoDAO = require("../model/DAO/genero")
// const { log } = require("console")

async function inserirGenero(Genero, contentType) {
    try {
        if(contentType == "application/json"){
            if(CORRECTION.CHECK_tbl_genero(Genero)){
                let resultGenero = await generoDAO.insertGenero(Genero)
                if (resultGenero){
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

async function atualizarGenero(Genero, idGenero, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Genero);
            // console.log(CORRECTION.verificarAtributosGenero(Genero));
            // console.log(CORRECTION.CHECK_ID(idGenero));
            console.log(CORRECTION.CHECK_tbl_genero(Genero));
            console.log(CORRECTION.CHECK_ID(idGenero));
            
            
            if(CORRECTION.CHECK_tbl_genero(Genero) && CORRECTION.CHECK_ID(idGenero)){

                let resultGenero = await buscarGenero(parseInt(idGenero))
                
                

                if(resultGenero.status_code == 201){

                    Genero.id = parseInt(idGenero)
                    

                    let result = await generoDAO.updateGenero(Genero)
                    // console.log(result)
                    
                    if(result){
                        return MENSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        console.log("buscar");
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultGenero.status_code == 404){

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

async function excluirGenero(idGenero) {
    try { 
        if(CORRECTION.CHECK_ID(idGenero)){
            let verification = await generoDAO.selectByIdGenero(parseInt(idGenero))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultGenero = await generoDAO.deleteGenero(parseInt(idGenero))
                    return resultGenero ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosGenero() {
    try {
        let resultGenero = await generoDAO.selectAllGenero()

        if(resultGenero != false || typeof(resultGenero) == 'object'){
            if(resultGenero.length > 0){
                let dadosGeneros = {
                    "status": true,
                    "status_code": 201,
                    "items": resultGenero.length,
                    "genres": resultGenero
                }
                return dadosGeneros
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

async function buscarGenero(idGenero) {
    try {
        // console.log(idGenero);
        
        if(CORRECTION.CHECK_ID(idGenero)){
            let resultGenero = await generoDAO.selectByIdGenero(parseInt(idGenero))

            if(resultGenero != false || typeof(resultGenero) == 'object'){
                if(resultGenero.length > 0){
                    let dadosGeneros = {
                        "status": true,
                        "status_code": 201,
                        "genre": resultGenero
                    }
                    return dadosGeneros
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
    inserirGenero,
    atualizarGenero,
    excluirGenero,
    listarTodosGenero,
    buscarGenero
}