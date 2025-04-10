const MENSAGE = require("../modulo/config")
const CORRECTION = require("../utils/inputCheck")

const plataformaDAO = require("../model/DAO/plataforma")
// const { log } = require("console")

async function inserirPlataforma(Plataforma, contentType) {
    try {
        if(contentType == "application/json"){
            if(CORRECTION.CHECK_tbl_plataforma(Plataforma)){
                let resultPlataforma = await plataformaDAO.insertPlataforma(Plataforma)
                if (resultPlataforma){
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

async function atualizarPlataforma(Plataforma, idPlataforma, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Plataforma);
            // console.log(CORRECTION.verificarAtributosPlataforma(Plataforma));
            // console.log(CORRECTION.CHECK_ID(idPlataforma));
            console.log(CORRECTION.CHECK_tbl_plataforma(Plataforma));
            console.log(CORRECTION.CHECK_ID(idPlataforma));
            
            
            if(CORRECTION.CHECK_tbl_plataforma(Plataforma) && CORRECTION.CHECK_ID(idPlataforma)){

                let resultPlataforma = await buscarPlataforma(parseInt(idPlataforma))
                
                

                if(resultPlataforma.status_code == 201){

                    Plataforma.id = parseInt(idPlataforma)
                    

                    let result = await plataformaDAO.updatePlataforma(Plataforma)
                    // console.log(result)
                    
                    if(result){
                        return MENSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        console.log("buscar");
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultPlataforma.status_code == 404){

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

async function excluirPlataforma(idPlataforma) {
    try { 
        if(CORRECTION.CHECK_ID(idPlataforma)){
            let verification = await plataformaDAO.selectByIdPlataforma(parseInt(idPlataforma))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultPlataforma = await plataformaDAO.deletePlataforma(parseInt(idPlataforma))
                    return resultPlataforma ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosPlataforma() {
    try {
        let resultPlataforma = await plataformaDAO.selectAllPlataforma()

        if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){
            if(resultPlataforma.length > 0){
                let dadosPlataformas = {
                    "status": true,
                    "status_code": 201,
                    "items": resultPlataforma.length,
                    "platforms": resultPlataforma
                }
                return dadosPlataformas
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

async function buscarPlataforma(idPlataforma) {
    try {
        // console.log(idPlataforma);
        
        if(CORRECTION.CHECK_ID(idPlataforma)){
            let resultPlataforma = await plataformaDAO.selectByIdPlataforma(parseInt(idPlataforma))

            if(resultPlataforma != false || typeof(resultPlataforma) == 'object'){
                if(resultPlataforma.length > 0){
                    let dadosPlataformas = {
                        "status": true,
                        "status_code": 201,
                        "platform": resultPlataforma
                    }
                    return dadosPlataformas
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
    inserirPlataforma,
    atualizarPlataforma,
    excluirPlataforma,
    listarTodosPlataforma,
    buscarPlataforma
}