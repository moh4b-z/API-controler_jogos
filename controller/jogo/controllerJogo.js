/*************************************************************************
Objetiv: Controller responsável pela regra de negócio do CRUD do jogo
Data: 13/02/2025
Autor: Mohammmad
Versão: 1.0
************************************************************************/
const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")

const jogoDAO = require("../../model/DAO/jogo")
// const { log } = require("console")

async function inserirJogo(jogo, contentType) {
    try {
        if(contentType == "application/json"){
            if(CORRECTION.verificarAtributosJogo(jogo)){
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }else{
                let resultJogo = await jogoDAO.insertJogo(jogo)
                if (resultJogo){
                    return MENSAGE.SUCCESS_CEATED_ITEM
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

async function atualizarJogo(jogo, idJogo, contentType) {
    try {
        if(contentType == "application/json"){
            console.log(jogo);
            console.log(CORRECTION.verificarAtributosJogo(jogo));
            console.log(CORRECTION.verificarID(idJogo));
            
            if(CORRECTION.verificarAtributosJogo(jogo) || (CORRECTION.verificarID(idJogo))){
                return MENSAGE.ERROR_REQUIRED_FIELDS
            }else{
                console.log(parseInt(idJogo));
                
                let resultJogo = await buscarJogo(parseInt(idJogo))
                console.log(resultJogo);
                

                if(resultJogo.status_code == 200){

                    jogo.id = parseInt(idJogo)
                    

                    let result = await jogoDAO.updateJogo()
                    
                    if(result){
                        return MENSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultJogo.status_code == 404){

                    return MENSAGE.ERROR_NOT_FOUND
                }else{
                    console.log("buscar");
                    
                    return MENSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
                }
            }
        }else{

            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        return MENSAGE.ERROR_INTERNAL_SERVER_CONTROLLER
    }
}

async function excluirJogo(idJogo) {
    try { 
        if(CORRECTION.verificarID(idJogo)){
            let verification = await jogoDAO.selectByIdJogo(parseInt(idJogo))

            if(verification != false || typeof(verification) == 'object'){
                if(verification.length > 0){
                    let resultJogo = await jogoDAO.deleteJogo(parseInt(idJogo))
                    return resultJogo ? MENSAGE.SUCCESS_DELETE_ITEM : MENSAGE.ERROR_NOT_DELETE
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
        // console.log(idJogo);
        
        if(CORRECTION.verificarID1(idJogo)){
            let resultJogo = await jogoDAO.selectByIdJogo(parseInt(idJogo))

            if(resultJogo != false || typeof(resultJogo) == 'object'){
                if(resultJogo.length > 0){
                    let dadosJogos = {
                        "status": true,
                        "status_code": 201,
                        "game": resultJogo
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
        CORRECTION.corrigirNotNullVarchar(jogo.nome, 80) ||
        CORRECTION.corrigirNotNullVarchar(jogo.data_lacamento, 10) ||
        CORRECTION.corrigirNotNullVarchar(jogo.versao, 10) ||
        CORRECTION.corrigirVarchar(jogo.tamanho, 10) ||
        CORRECTION.corrigirUndefined(jogo.descricao) ||
        CORRECTION.corrigirVarchar(jogo.foto_capa, 200) ||
        CORRECTION.corrigirVarchar(jogo.link, 200)
    ){
        console.log(CORRECTION.corrigirNotNullVarchar(jogo.nome, 80))
        console.log(CORRECTION.corrigirNotNullVarchar(jogo.data_lacamento, 10))
        console.log(CORRECTION.corrigirNotNullVarchar(jogo.versao, 10))
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




module.exports = {
    inserirJogo,
    atualizarJogo,
    excluirJogo,
    listarTodosJogo,
    buscarJogo
}