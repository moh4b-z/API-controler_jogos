/*************************************************************************
Objetiv: Controller responsável pela regra de negócio do CRUD do jogo
Data: 13/02/2025
Autor: Mohammmad
Versão: 1.0
************************************************************************/
const MENSAGE = require("../../modulo/config")

const jogoDAO = require("../../model/DAO/jogo")
// const { log } = require("console")

async function inserirJogo(jogo, contentType) {
    try {
        if(contentType == "application/json"){
            if(
                corrigirNotNullVarchar(jogo.nome, 80) ||
                corrigirNotNullVarchar(jogo.data_lacamento, 10) ||
                corrigirNotNullVarchar(jogo.versao, 10) ||
                corrigirVarchar(jogo.tamanho, 10) ||
                corrigirUndefined(jogo.descricao) ||
                corrigirVarchar(jogo.foto_capa, 200) ||
                corrigirVarchar(jogo.link, 200)
            ){
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultJogo = await jogoDAO.insertJogo(jogo)
                if (resultJogo){
                    return MENSAGE.SUCCVESS_CEATED_ITEM
                }else{
                    return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                }
            }
        }else{
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
    
    
}
async function atualizarJogo(jogo) {
    
}
async function excluirJogo(jogo) {
    
}
async function listarTodosJogo() {
    try {
        let resultJogo = await jogoDAO.selectAllJogo()

        if(resultJogo != false || typeof(resultJogo) == 'object'){
            if(resultJogo.length > 0){
                let dadosJogos = {
                    "status": true,
                    "status_code": 201,
                    "items": resultJogo.length,
                    "games": resultJogo
                }
                return dadosJogos
            }else{
                return MENSAGE.ERROR_NOT_FOUND
            }
        }else{
            return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
        }
        
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


async function buscarJogo(idJogo) {
    try {
        let id = verificarNumero(idJogo)
        if(id){
            let resultJogo = await jogoDAO.selectByIdJogo(id)

            if(resultJogo != false || typeof(resultJogo) == 'object'){
                if(resultJogo.length > 0){
                    let dadosJogos = {
                        "status": true,
                        "status_code": 201,
                        "items": resultJogo.length,
                        "games": resultJogo
                    }
                    return dadosJogos
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
        return MENSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}


function teste(jogo){
    if(
        corrigirNotNullVarchar(jogo.nome, 80) ||
        corrigirNotNullVarchar(jogo.data_lacamento, 10) ||
        corrigirNotNullVarchar(jogo.versao, 10) ||
        corrigirVarchar(jogo.tamanho, 10) ||
        corrigirUndefined(jogo.descricao) ||
        corrigirVarchar(jogo.foto_capa, 200) ||
        corrigirVarchar(jogo.link, 200)
    ){
        console.log(corrigirNotNullVarchar(jogo.nome, 80))
        console.log(corrigirNotNullVarchar(jogo.data_lacamento, 10))
        console.log(corrigirNotNullVarchar(jogo.versao, 10))
        // console.log(corrigirVarchar(jogo.tamanho, 10))
        // console.log(corrigirUndefined(jogo.descricao))
        // console.log(corrigirVarchar(jogo.foto_capa, 200))
        // console.log(corrigirVarchar(jogo.link, 200))
        console.log(jogo)
        return MENSAGE.ERROR_REQUIRED_FIELDS
    }else{
        return ("texto certo")
    }
    
}

// console.log(teste({
//     "nome": "Mario Bros",
//     "data_lacamento": "1986-06-03",
//     "versao": "1.0",
//     "tamanho": "500Kb",
//     "descricao": "Jogo legal",
//     "foto_capa": "http://foto.jpg",
//     "link": "http://downloadjogo.zip"
// }))


function verificarNumero(number){
    let numero = Number(number)
    if(numero == undefined || numero == "" || numero == null ){
        numero = false
    }
    return numero
}

function corrigirNotNullVarchar(text, letras){
    // console.log(text + " - " + letras)
    if(text == undefined || text == "" || text == null || text.length > letras){
        return true
    }else{
        return false
    }
}

function corrigirVarchar(text, letras){
    if(text == undefined || text.length > letras){
        return true
    }else{
        return false
    }
}
function corrigirUndefined(text){
    if(text == undefined){
        return true
    }else{
        return false
    }
}

module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarTodosJogo,
    buscarJogo
}