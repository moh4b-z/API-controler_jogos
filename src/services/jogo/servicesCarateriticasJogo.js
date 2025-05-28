const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")
const util = require('util');

const servicesGenero = require("./servicesGenero")
const servicesPlataforma = require("./servicesPlataforma")
const servicesTipoPagamento = require("./servicesTipoPagamento")



async function listarCarateristicas() {
    try {
        let resultGenero = await servicesGenero.listarTodosGenero()
        let resultPlataforma = await servicesPlataforma.listarTodosPlataforma()
        let resultTipoPagamento = await servicesTipoPagamento.listarTodosTipo_pagamento()

        if(
            resultGenero != false || typeof(resultGenero) == 'object'||
            resultPlataforma != false || typeof(resultPlataforma) == 'object'||
            resultTipoPagamento != false || typeof(resultTipoPagamento) == 'object'
        ){
            if(
                resultGenero.genres.length > 0 ||
                resultPlataforma.platforms.length > 0 ||
                resultTipoPagamento.typesOfPayments.length > 0 
            ){
                let dadosJogos = {
                    "status": true,
                    "status_code": 201,
                    "Generos": {
                        "items": resultGenero.genres.length,
                        "Generos": resultGenero.genres
                    },
                    "Plataformas": {
                        "items": resultPlataforma.platforms.length,
                        "Plataformas": resultPlataforma.platforms
                    },
                    "TiposPagemntos": {
                        "items": resultTipoPagamento.typesOfPayments.length,
                        "TiposPagemntos": resultTipoPagamento.typesOfPayments
                    }
                    
                }
                return dadosJogos
            }else{
               console.log(resultGenero);
               console.log(resultPlataforma);
               console.log(resultTipoPagamento);
               
                return MENSAGE.ERROR_NOT_FOUND
            }
        }else{
            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
        
    } catch (error) {
        console.log(error);
        
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}


module.exports = {
    listarCarateristicas
}