const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const servicesJogo = require("../jogo/servicesJogo")
const conquistasDAO = require("../../model/DAO/conquistas")
// const { log } = require("console")

async function inserirConquistas(Conquistas, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Conquistas)
            // console.log(TableCORRECTION.CHECK_tbl_Conquistas(Conquistas))
            
            
            if(TableCORRECTION.CHECK_tbl_Conquistas(Conquistas)){
                if(servicesJogo.buscarJogo(Conquistas.id_jogo)){
                    let resultConquistas = await conquistasDAO.insertConquistas(Conquistas)
                    if (resultConquistas){
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

async function atualizarConquistas(Conquistas, idConquistas, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Conquistas);
            // console.log(CORRECTION.verificarAtributosConquistas(Conquistas));
            // console.log(CORRECTION.CHECK_ID(idConquistas));
            // console.log((Conquistas));
            // console.log((idConquistas));
            
            
            if(TableCORRECTION.CHECK_tbl_Conquistas(Conquistas) && CORRECTION.CHECK_ID(idConquistas)){

                let resultConquistas = await buscarConquistas(parseInt(idConquistas))
                
                

                if(resultConquistas.status_code == 201){

                    if(
                        servicesJogo.buscarJogo(Conquistas.id_jogo)
                    ){
                        Conquistas.id = parseInt(idConquistas)

                        let result = await conquistasDAO.updateConquistas(Conquistas)
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
                }else if(resultConquistas.status_code == 404){

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

async function excluirConquistas(idConquistas) {
    try { 
        if(CORRECTION.CHECK_ID(idConquistas)){
            let verification = await conquistasDAO.selectByIdConquistas(parseInt(idConquistas))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultConquistas = await conquistasDAO.deleteConquistas(parseInt(idConquistas))
                    return resultConquistas ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosConquistas() {
    try {
        let resultConquistas = await conquistasDAO.selectAllConquistas()

        if(resultConquistas != false || typeof(resultConquistas) == 'object'){
            if(resultConquistas.length > 0){
                let dadosConquistass = {
                    "status": true,
                    "status_code": 201,
                    "items": resultConquistas.length,
                    "achievements": resultConquistas
                }
                return dadosConquistass
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

async function buscarConquistas(idConquistas) {
    try {
        // console.log(idConquistas);
        
        if(CORRECTION.CHECK_ID(idConquistas)){
            let resultConquistas = await conquistasDAO.selectByIdConquistas(parseInt(idConquistas))

            if(resultConquistas != false || typeof(resultConquistas) == 'object'){
                if(resultConquistas.length > 0){
                    let dadosConquistass = {
                        "status": true,
                        "status_code": 201,
                        "achievement": resultConquistas
                    }
                    return dadosConquistass
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
    inserirConquistas,
    atualizarConquistas,
    excluirConquistas,
    listarTodosConquistas,
    buscarConquistas
}