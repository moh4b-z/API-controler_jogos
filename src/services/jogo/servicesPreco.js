const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")

const servicesJogo = require("./servicesJogo")
const servicesPlataforma = require("./servicesPlataforma")
const servicesPaises = require("../paises/servicesPaises")
const servicesTipoPagamento = require("./servicesTipoPagamento")
const precoDAO = require("../../model/DAO/preco")
// const { log } = require("console")

async function inserirPreco(Preco, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Preco)
            // console.log(TableCORRECTION.CHECK_tbl_preco(Preco))
            
            
            if(TableCORRECTION.CHECK_tbl_preco(Preco)){
                if(
                    servicesJogo.buscarJogo(Preco.id_jogo) && 
                    servicesPaises.buscarPaises(Preco.id_paises) &&
                    servicesPlataforma.buscarPlataforma(Preco.id_plataforma) && 
                    servicesTipoPagamento.buscarTipo_pagamento(Preco.id_tipo_pagamento)
                ){
                    let resultPreco = await precoDAO.insertPreco(Preco)
                    if (resultPreco){
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

async function atualizarPreco(Preco, idPreco, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(Preco);
            // console.log(CORRECTION.verificarAtributosPreco(Preco));
            // console.log(CORRECTION.CHECK_ID(idPreco));
            // console.log((Preco));
            // console.log((idPreco));
            
            
            if(TableCORRECTION.CHECK_tbl_preco(Preco) && CORRECTION.CHECK_ID(idPreco)){

                let resultPreco = await buscarPreco(parseInt(idPreco))
                
                

                if(resultPreco.status_code == 201){

                    if(
                        servicesJogo.buscarJogo(Preco.id_jogo) && 
                        servicesPaises.buscarPaises(Preco.id_paises) &&
                        servicesPlataforma.buscarPlataforma(Preco.id_plataforma) && 
                        servicesTipoPagamento.buscarTipo_pagamento(Preco.id_tipo_pagamento)
                    ){
                        Preco.id = parseInt(idPreco)

                        let result = await precoDAO.updatePreco(Preco)
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
                }else if(resultPreco.status_code == 404){

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

async function excluirPreco(idPreco) {
    try { 
        if(CORRECTION.CHECK_ID(idPreco)){
            let verification = await precoDAO.selectByIdPreco(parseInt(idPreco))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultPreco = await precoDAO.deletePreco(parseInt(idPreco))
                    return resultPreco ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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

async function listarTodosPreco() {
    try {
        let resultPreco = await precoDAO.selectAllPreco()

        if(resultPreco != false || typeof(resultPreco) == 'object'){
            if(resultPreco.length > 0){
                let dadosPrecos = {
                    "status": true,
                    "status_code": 201,
                    "items": resultPreco.length,
                    "game_prices": resultPreco
                }
                return dadosPrecos
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

async function buscarPreco(idPreco) {
    try {
        // console.log(idPreco);
        
        if(CORRECTION.CHECK_ID(idPreco)){
            let resultPreco = await precoDAO.selectByIdPreco(parseInt(idPreco))

            if(resultPreco != false || typeof(resultPreco) == 'object'){
                if(resultPreco.length > 0){
                    let dadosPrecos = {
                        "status": true,
                        "status_code": 201,
                        "game_price": resultPreco
                    }
                    return dadosPrecos
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
    inserirPreco,
    atualizarPreco,
    excluirPreco,
    listarTodosPreco,
    buscarPreco
}