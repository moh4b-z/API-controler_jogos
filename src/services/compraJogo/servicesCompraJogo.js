const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const servicesPreco = require("../preco/servicesPreco")
const servicesUsuario = require("../usuario/servicesUsuario")
const compraJogoDAO = require("../../model/DAO/compraJogo")
// const { log } = require("console")

async function inserirCompraJogo(CompraJogo, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(CompraJogo)
            // console.log(TableCORRECTION.CHECK_tbl_CompraJogo(CompraJogo))
            
            
            if(TableCORRECTION.CHECK_tbl_compra_jogo(CompraJogo)){
                if(
                    servicesPreco.buscarPreco(CompraJogo.id_preco) && 
                    servicesUsuario.buscarUsuario(CompraJogo.id_usuario)
                ){
                    let resultCompraJogo = await compraJogoDAO.insertCompraJogo(CompraJogo)
                    if (resultCompraJogo){
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

async function atualizarCompraJogo(CompraJogo, idCompraJogo, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(CompraJogo);
            // console.log(CORRECTION.verificarAtributosCompraJogo(CompraJogo));
            // console.log(CORRECTION.CHECK_ID(idCompraJogo));
            // console.log((CompraJogo));
            // console.log((idCompraJogo));
            
            
            if(
                TableCORRECTION.CHECK_tbl_compra_jogo(CompraJogo) && 
                CORRECTION.CHECK_ID(idCompraJogo)
            ){
                let resultCompraJogo = await buscarCompraJogo(parseInt(idCompraJogo))

                if(resultCompraJogo.status_code == 201){
                    if(
                        servicesPreco.buscarPreco(CompraJogo.id_preco) && 
                        servicesUsuario.buscarUsuario(CompraJogo.id_usuario)
                    ){
                        CompraJogo.id = parseInt(idCompraJogo)

                        let result = await compraJogoDAO.updateCompraJogo(CompraJogo)
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
                }else if(resultCompraJogo.status_code == 404){

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

async function excluirCompraJogo(idCompraJogo) {
    try { 
        if(CORRECTION.CHECK_ID(idCompraJogo)){
            let verification = await compraJogoDAO.selectByIdCompraJogo(parseInt(idCompraJogo))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultCompraJogo = await compraJogoDAO.deleteCompraJogo(parseInt(idCompraJogo))
                    return resultCompraJogo ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosCompraJogo() {
    try {
        let resultCompraJogo = await compraJogoDAO.selectAllCompraJogo()

        if(resultCompraJogo != false || typeof(resultCompraJogo) == 'object'){
            if(resultCompraJogo.length > 0){
                let dadosCompraJogos = {
                    "status": true,
                    "status_code": 201,
                    "items": resultCompraJogo.length,
                    "game_genres": resultCompraJogo
                }
                return dadosCompraJogos
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

async function buscarCompraJogo(idCompraJogo) {
    try {
        // console.log(idCompraJogo);
        
        if(CORRECTION.CHECK_ID(idCompraJogo)){
            let resultCompraJogo = await compraJogoDAO.selectByIdCompraJogo(parseInt(idCompraJogo))

            if(resultCompraJogo != false || typeof(resultCompraJogo) == 'object'){
                if(resultCompraJogo.length > 0){
                    let dadosCompraJogos = {
                        "status": true,
                        "status_code": 201,
                        "sex": resultCompraJogo
                    }
                    return dadosCompraJogos
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
    inserirCompraJogo,
    atualizarCompraJogo,
    excluirCompraJogo,
    listarTodosCompraJogo,
    buscarCompraJogo
}