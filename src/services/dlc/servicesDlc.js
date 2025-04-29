const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")

const servicesJogo = require("../jogo/servicesJogo")
const dlcDAO = require("../../model/DAO/dlc")
// const { log } = require("console")

async function inserirDlc(Dlc, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Dlc);
            // console.log(CORRECTION.CHECK_tbl_dlc(Dlc));
            
            
            if(CORRECTION.CHECK_tbl_dlc(Dlc)){
                if(servicesJogo.buscarJogo(Dlc.id_jogo_principal) && servicesJogo.buscarJogo(Dlc.id_jogo_dlc)){
                    let resultDlc = await dlcDAO.insertDlc(Dlc)
                    if (resultDlc){
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

async function atualizarDlc(Dlc, idDlc, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Dlc);
            // console.log(CORRECTION.verificarAtributosDlc(Dlc));
            // console.log(CORRECTION.CHECK_ID(idDlc));
            // console.log((Dlc));
            // console.log((idDlc));
            
            
            if(CORRECTION.CHECK_tbl_dlc(Dlc) && CORRECTION.CHECK_ID(idDlc)){

                let resultDlc = await buscarDlc(parseInt(idDlc))
                
                

                if(resultDlc.status_code == 201){

                    if(
                        servicesJogo.buscarJogo(Dlc.id_jogo_principal) && 
                        servicesJogo.buscarJogo(Dlc.id_jogo_dlc)
                    ){
                        Dlc.id = parseInt(idDlc)

                        let result = await dlcDAO.updateDlc(Dlc)
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
                }else if(resultDlc.status_code == 404){

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

async function excluirDlc(idDlc) {
    try { 
        if(CORRECTION.CHECK_ID(idDlc)){
            let verification = await dlcDAO.selectByIdDlc(parseInt(idDlc))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultDlc = await dlcDAO.deleteDlc(parseInt(idDlc))
                    return resultDlc ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosDlc() {
    try {
        let resultDlc = await dlcDAO.selectAllDlc()

        if(resultDlc != false || typeof(resultDlc) == 'object'){
            if(resultDlc.length > 0){
                let dadosDlcs = {
                    "status": true,
                    "status_code": 201,
                    "items": resultDlc.length,
                    "sexes": resultDlc
                }
                return dadosDlcs
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

async function buscarDlc(idDlc) {
    try {
        // console.log(idDlc);
        
        if(CORRECTION.CHECK_ID(idDlc)){
            let resultDlc = await dlcDAO.selectByIdDlc(parseInt(idDlc))

            if(resultDlc != false || typeof(resultDlc) == 'object'){
                if(resultDlc.length > 0){
                    let dadosDlcs = {
                        "status": true,
                        "status_code": 201,
                        "sex": resultDlc
                    }
                    return dadosDlcs
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
    inserirDlc,
    atualizarDlc,
    excluirDlc,
    listarTodosDlc,
    buscarDlc
}