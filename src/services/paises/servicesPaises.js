const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const paisesDAO = require("../../model/DAO/paises")
// const { log } = require("console")

async function inserirPaises(Paises, contentType) {
    try {
        if(contentType == "application/json"){
            if(TableCORRECTION.CHECK_tbl_paises(Paises)){
                let resultPaises = await paisesDAO.insertPaises(Paises)
                if (resultPaises){
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

async function atualizarPaises(Paises, idPaises, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Paises);
            // console.log(CORRECTION.verificarAtributosPaises(Paises));
            // console.log(CORRECTION.CHECK_ID(idPaises));
            console.log(TableCORRECTION.CHECK_tbl_paises(Paises));
            console.log(CORRECTION.CHECK_ID(idPaises));
            
            
            if(TableCORRECTION.CHECK_tbl_paises(Paises) && CORRECTION.CHECK_ID(idPaises)){

                let resultPaises = await buscarPaises(parseInt(idPaises))
                

                if(resultPaises.status_code == 201){

                    Paises.id = parseInt(idPaises)
                    

                    let result = await paisesDAO.updatePaises(Paises)
                    // console.log(result)
                    
                    if(result){
                        return MENSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        console.log("buscar");
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultPaises.status_code == 404){

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

async function excluirPaises(idPaises) {
    try { 
        if(CORRECTION.CHECK_ID(idPaises)){
            let verification = await paisesDAO.selectByIdPaises(parseInt(idPaises))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultPaises = await paisesDAO.deletePaises(parseInt(idPaises))
                    return resultPaises ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosPaises() {
    try {
        let resultPaises = await paisesDAO.selectAllPaises()

        if(resultPaises != false || typeof(resultPaises) == 'object'){
            if(resultPaises.length > 0){
                let dadosPaisess = {
                    "status": true,
                    "status_code": 201,
                    "items": resultPaises.length,
                    "countries": resultPaises
                }
                return dadosPaisess
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

async function buscarPaises(idPaises) {
    try {
        // console.log(idPaises);
        
        if(CORRECTION.CHECK_ID(idPaises)){
            let resultPaises = await paisesDAO.selectByIdPaises(parseInt(idPaises))

            if(resultPaises != false || typeof(resultPaises) == 'object'){
                if(resultPaises.length > 0){
                    let dadosPaisess = {
                        "status": true,
                        "status_code": 201,
                        "country": resultPaises
                    }
                    return dadosPaisess
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
    inserirPaises,
    atualizarPaises,
    excluirPaises,
    listarTodosPaises,
    buscarPaises
}