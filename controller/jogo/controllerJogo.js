/*************************************************************************
Objetiv: Controller responsável pela regra de negócio do CRUD do jogo
Data: 13/02/2025
Autor: Mohammmad
Versão: 1.0
************************************************************************/
const MENSAGE = require("../../modulo/config")

const jogoDAO = require("../../model/DAO/jogo")

async function inserirJogo(jogo) {
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
            return MENSAGE.ERROR_INTERNAL_SERVER
        }
    }
    
}
async function atualizarJogo(jogo) {
    
}
async function excluirJogo(jogo) {
    
}
async function listarTodosJogo(jogo) {
    
}
async function buscarJogo(jogo) {
    
}

function corrigirNotNullVarchar(text, letras){
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