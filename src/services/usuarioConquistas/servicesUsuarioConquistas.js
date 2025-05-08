const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const servicesConquistas = require("../conquistas/servicesConquistas")
const servicesUsuario = require("../usuario/servicesUsuario")
const UsuarioConquistasDAO = require("../../model/DAO/usuarioConquistas")
// const { log } = require("console")

async function inserirUsuarioConquistas(UsuarioConquistas, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(UsuarioConquistas)
            // console.log(TableCORRECTION.CHECK_tbl_usuario_conquistas(UsuarioConquistas))
            
            
            if(TableCORRECTION.CHECK_tbl_usuario_conquistas(UsuarioConquistas)){
                if(
                    servicesConquistas.buscarConquistas(UsuarioConquistas.id_conquistas) && 
                    servicesUsuario.buscarUsuario(UsuarioConquistas.id_usuario)
                ){
                    let resultUsuarioConquistas = await UsuarioConquistasDAO.insertUsuarioConquistas(UsuarioConquistas)
                    if (resultUsuarioConquistas){
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

async function atualizarUsuarioConquistas(UsuarioConquistas, idUsuarioConquistas, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(UsuarioConquistas);
            // console.log(CORRECTION.verificarAtributosUsuarioConquistas(UsuarioConquistas));
            // console.log(CORRECTION.CHECK_ID(idUsuarioConquistas));
            // console.log((UsuarioConquistas));
            // console.log((idUsuarioConquistas));
            
            
            if(
                TableCORRECTION.CHECK_tbl_usuario_conquistas(UsuarioConquistas) && 
                CORRECTION.CHECK_ID(idUsuarioConquistas)
            ){
                let resultUsuarioConquistas = await buscarUsuarioConquistas(parseInt(idUsuarioConquistas))

                if(resultUsuarioConquistas.status_code == 201){
                    if(
                        servicesConquistas.buscarConquistas(UsuarioConquistas.id_conquistas) && 
                        servicesUsuario.buscarUsuario(UsuarioConquistas.id_usuario)
                    ){
                        UsuarioConquistas.id = parseInt(idUsuarioConquistas)

                        let result = await UsuarioConquistasDAO.updateUsuarioConquistas(UsuarioConquistas)
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
                }else if(resultUsuarioConquistas.status_code == 404){

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

async function excluirUsuarioConquistas(idUsuarioConquistas) {
    try { 
        if(CORRECTION.CHECK_ID(idUsuarioConquistas)){
            let verification = await UsuarioConquistasDAO.selectByIdUsuarioConquistas(parseInt(idUsuarioConquistas))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultUsuarioConquistas = await UsuarioConquistasDAO.deleteUsuarioConquistas(parseInt(idUsuarioConquistas))
                    return resultUsuarioConquistas ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosUsuarioConquistas() {
    try {
        let resultUsuarioConquistas = await UsuarioConquistasDAO.selectAllUsuarioConquistas()

        if(resultUsuarioConquistas != false || typeof(resultUsuarioConquistas) == 'object'){
            if(resultUsuarioConquistas.length > 0){
                let dadosUsuarioConquistass = {
                    "status": true,
                    "status_code": 201,
                    "items": resultUsuarioConquistas.length,
                    "user_achievements": resultUsuarioConquistas
                }
                return dadosUsuarioConquistass
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

async function buscarUsuarioConquistas(idUsuarioConquistas) {
    try {
        // console.log(idUsuarioConquistas);
        
        if(CORRECTION.CHECK_ID(idUsuarioConquistas)){
            let resultUsuarioConquistas = await UsuarioConquistasDAO.selectByIdUsuarioConquistas(parseInt(idUsuarioConquistas))

            if(resultUsuarioConquistas != false || typeof(resultUsuarioConquistas) == 'object'){
                if(resultUsuarioConquistas.length > 0){
                    let dadosUsuarioConquistass = {
                        "status": true,
                        "status_code": 201,
                        "user_achievement": resultUsuarioConquistas
                    }
                    return dadosUsuarioConquistass
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
    inserirUsuarioConquistas,
    atualizarUsuarioConquistas,
    excluirUsuarioConquistas,
    listarTodosUsuarioConquistas,
    buscarUsuarioConquistas
}