const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")
const encryptionFunction = require("../../utils/encryptionFunction")

const servicesPaises = require("../paises/servicesPaises")

const empresaDAO = require("../../model/DAO/empresa")

async function inserirEmpresa(Empresa, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Empresa)
            // console.log(TableCORRECTION.CHECK_tbl_empresa(Empresa))
            
            const { senha_salt, senha_hash } = encryptionFunction.hashPassword(Empresa.senha)
            Empresa.senha_salt = senha_salt
            Empresa.senha_hash = senha_hash
            delete Empresa.senha
            
            if(TableCORRECTION.CHECK_tbl_empresa(Empresa)){
                if(
                    servicesPaises.buscarPaises(Empresa.id_paises)
                ){
                    let resultEmpresa = await empresaDAO.insertEmpresa(Empresa)
                    if (resultEmpresa){
                        return {
                            ...MENSAGE.SUCCESS_CEATED_ITEM,
                            empresa: resultEmpresa
                        }
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

async function atualizarEmpresa(Empresa, idEmpresa, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Empresa)
            // console.log(CORRECTION.verificarAtributosEmpresa(Empresa))
            // console.log(CORRECTION.CHECK_ID(idEmpresa))
            // console.log((Empresa))
            // console.log((idEmpresa))
            
            
            if(TableCORRECTION.CHECK_tbl_empresa(Empresa) && CORRECTION.CHECK_ID(idEmpresa)){

                let resultEmpresa = await buscarEmpresa(parseInt(idEmpresa))
                
                if(resultEmpresa.status_code == 201){
                    if(
                        servicesPaises.buscarPaises(Empresa.id_paises)
                    ){
                        Empresa.id = parseInt(idEmpresa)

                        let result = await empresaDAO.updateEmpresa(Empresa)
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
                }else if(resultEmpresa.status_code == 404){

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


async function loginEmpresa(loginData, contentType) {
    try {
        if (contentType == "application/json") {
            const { email, senha } = loginData

            if (!email || !senha) {
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }

            const Empresa = await empresaDAO.loginEmpresa(email)

            if (!Empresa) {
                return MENSAGE.ERROR_NOT_FOUND 
            }
            const senhaValida = encryptionFunction.verifyPassword(
                senha,
                Empresa.senha_salt,
                Empresa.senha_hash
            )
            if (senhaValida) {
                // remove os dados sensíveis
                delete Empresa.senha_salt
                delete Empresa.senha_hash

                return {
                    ...MENSAGE.SUCCESS_LOGIN,
                    Empresa: Empresa
                }
            } else {
                return MENSAGE.ERROR_INVALID_CREDENTIALS
            }
        } else {
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}


async function excluirEmpresa(idEmpresa) {
    try { 
        if(CORRECTION.CHECK_ID(idEmpresa)){
            let verification = await empresaDAO.selectByIdEmpresa(parseInt(idEmpresa))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultEmpresa = await empresaDAO.deleteEmpresa(parseInt(idEmpresa))
                    return resultEmpresa ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosEmpresa() {
    try {
        let resultEmpresa = await empresaDAO.selectAllEmpresa()

        if(resultEmpresa != false || typeof(resultEmpresa) == 'object'){
            if(resultEmpresa.length > 0){
                let dadosEmpresas = {
                    "status": true,
                    "status_code": 201,
                    "items": resultEmpresa.length,
                    "enterprises": resultEmpresa
                }
                return dadosEmpresas
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

async function buscarEmpresa(idEmpresa) {
    try {
        // console.log(idEmpresa);
        
        if(CORRECTION.CHECK_ID(idEmpresa)){
            let resultEmpresa = await empresaDAO.selectByIdEmpresa(parseInt(idEmpresa))

            if(resultEmpresa != false || typeof(resultEmpresa) == 'object'){
                if(resultEmpresa.length > 0){
                    let dadosEmpresas = {
                        "status": true,
                        "status_code": 201,
                        "enterprise": resultEmpresa
                    }
                    return dadosEmpresas
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
    inserirEmpresa,
    atualizarEmpresa,
    excluirEmpresa,
    listarTodosEmpresa,
    buscarEmpresa,
    loginEmpresa
}