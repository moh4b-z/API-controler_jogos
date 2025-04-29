const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")

const sexoDAO = require("../../model/DAO/sexo")
// const { log } = require("console")

async function inserirSexo(Sexo, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Sexo);
            // console.log(CORRECTION.CHECK_tbl_sexo(Sexo));
            
            
            if(CORRECTION.CHECK_tbl_sexo(Sexo)){
                let resultSexo = await sexoDAO.insertSexo(Sexo)
                if (resultSexo){
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

async function atualizarSexo(Sexo, idSexo, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Sexo);
            // console.log(CORRECTION.verificarAtributosSexo(Sexo));
            // console.log(CORRECTION.CHECK_ID(idSexo));
            // console.log((Sexo));
            // console.log((idSexo));
            
            
            if(CORRECTION.CHECK_tbl_sexo(Sexo) && CORRECTION.CHECK_ID(idSexo)){

                let resultSexo = await buscarSexo(parseInt(idSexo))
                
                

                if(resultSexo.status_code == 201){

                    Sexo.id = parseInt(idSexo)
                    

                    let result = await sexoDAO.updateSexo(Sexo)
                    // console.log(result)
                    
                    if(result){
                        return MENSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        console.log(result);
                        
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultSexo.status_code == 404){

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

async function excluirSexo(idSexo) {
    try { 
        if(CORRECTION.CHECK_ID(idSexo)){
            let verification = await sexoDAO.selectByIdSexo(parseInt(idSexo))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultSexo = await sexoDAO.deleteSexo(parseInt(idSexo))
                    return resultSexo ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosSexo() {
    try {
        let resultSexo = await sexoDAO.selectAllSexo()

        if(resultSexo != false || typeof(resultSexo) == 'object'){
            if(resultSexo.length > 0){
                let dadosSexos = {
                    "status": true,
                    "status_code": 201,
                    "items": resultSexo.length,
                    "sexes": resultSexo
                }
                return dadosSexos
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

async function buscarSexo(idSexo) {
    try {
        // console.log(idSexo);
        
        if(CORRECTION.CHECK_ID(idSexo)){
            let resultSexo = await sexoDAO.selectByIdSexo(parseInt(idSexo))

            if(resultSexo != false || typeof(resultSexo) == 'object'){
                if(resultSexo.length > 0){
                    let dadosSexos = {
                        "status": true,
                        "status_code": 201,
                        "sex": resultSexo
                    }
                    return dadosSexos
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
    inserirSexo,
    atualizarSexo,
    excluirSexo,
    listarTodosSexo,
    buscarSexo
}