/*************************************************************************
Objetiv: Controller responsável pela regra de negócio do CRUD do jogo
Data: 24/03/2025
Autor: Mohammmad
Versão: 1.1
************************************************************************/
const MENSAGE = require("../../modulo/config")
const CORRECTION = require("../../utils/inputCheck")
const TableCORRECTION = require("../../utils/tablesCheck")
const util = require('util');

const jogoDAO = require("../../model/DAO/jogo")
const servicesConquistas = require("./servicesConquistas")
const servicesDlc = require("./servicesDlc")
const servicesJogoGenero = require("./servicesJogoGenero")
const servicesJogoPlataforma = require("./servicesJogoPlataforma")
const servicesPreco = require("./servicesPreco")
const servicesPublicacaoJogoDaEmpresa = require("./servicesPublicacaoJogoDaEmpresa")
const servicesPublicacaoJogoDoUsuario = require("./servicesPublicacaoJogoDoUsuario")
// const { log } = require("console")

async function inserirJogo(jogo, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(TableCORRECTION.CHECK_tbl_jogo(jogo));
            // Verifica se o publicador existe (empresa ou usuário)
            const isEmpresa = jogo.IsItACompany
            const publicacaoExiste = isEmpresa
                ? (await servicesPublicacaoJogoDaEmpresa.buscarPublicacao(jogo.publisherId)).status_code === 201
                : (await servicesPublicacaoJogoDoUsuario.buscarPublicacao(jogo.publisherId)).status_code === 201

            if(publicacaoExiste){
                if(TableCORRECTION.CHECK_tbl_jogo(jogo)){
                    
                    let resultJogo = await jogoDAO.insertJogo(jogo)
                    resultJogo.resultPublicacao = isEmpresa ? 
                        await servicesPublicacaoJogoDaEmpresa.inserirPublicacao(
                            {
                                data_de_publicacao: jogo.data_de_publicacao,
                                id_empresa: jogo.publisherId,
                                id_jogo: resultJogo.id
                            }, contentType
                        )
                        :
                        await servicesPublicacaoJogoDaEmpresa.inserirPublicacao(
                            {
                                data_de_publicacao: jogo.data_de_publicacao,
                                id_usuario: jogo.publisherId,
                                id_jogo: resultJogo.id
                            }, contentType
                        )
                    resultJogo.resultGenero = []
                    resultJogo.resultPlataforma = []
                    resultJogo.resultPreco = []
                    for(const idItem of jogo.game_genre){
                        let result = await servicesJogoGenero.inserirJogo_genero(
                            {
                                id_jogo: resultJogo.id,
                                id_genero: idItem
                            },
                            contentType
                        )
                        resultJogo.resultGenero.push(result)
                    }
                    for(const idItem of jogo.game_platform){
                        let result = await servicesJogoPlataforma.inserirJogo_plataforma(
                            {
                                id_jogo: resultJogo.id,
                                id_plataforma: idItem
                            },
                            contentType
                        )
                        resultJogo.resultPlataforma.push(result)
                    }

                    for (const idPlataforma of jogo.game_platform) {
                        for (const idTipoPagamento of jogo.typeOfPayments) {
                            const result = await servicesPreco.inserirPreco(
                                {
                                    valor: jogo.valor || 0.00,
                                    id_jogo: resultJogo.id,
                                    id_paises: jogo.id_paises,
                                    id_plataforma: idPlataforma,
                                    id_tipo_pagamento: idTipoPagamento,
                                },
                                contentType
                            )

                            resultJogo.resultPreco.push(result)
                        }
                    }
                    
                    if (resultJogo){
                        return {...MENSAGE.SUCCESS_CEATED_ITEM, game: resultJogo}
                    }else{
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }
                    
                }else{
                    return MENSAGE.ERROR_REQUIRED_FIELDS
                }
            }else{
                return {...MENSAGE.ERROR_NOT_FOUND, speccification: "É obrigatorio ter o id de quem publicou"}
            }
            
        }else{
            return MENSAGE.ERROR_CONTENT_TYPE
        }
    } catch (error) {
        console.log(error)
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
    
    
}

async function atualizarJogo(jogo, idJogo, contentType) {
    try {
        if(contentType == "application/json"){
            // console.log(jogo);
            // console.log(CORRECTION.verificarAtributosJogo(jogo));
            // console.log(CORRECTION.CHECK_ID(idJogo));
            console.log(TableCORRECTION.CHECK_tbl_jogo(jogo))
            console.log(CORRECTION.CHECK_ID(idJogo))
            
            
            if(TableCORRECTION.CHECK_tbl_jogo(jogo) && CORRECTION.CHECK_ID(idJogo)){

                let resultJogo = await buscarJogo(parseInt(idJogo))
                
                

                if(resultJogo.status_code == 201){

                    jogo.id = parseInt(idJogo)
                    

                    let result = await jogoDAO.updateJogo(jogo)
                    console.log(result)
                    
                    if(result){
                        return MENSAGE.SUCCESS_UPDATED_ITEM
                    }else{
                        console.log("buscar");
                        return MENSAGE.ERROR_INTERNAL_SERVER_MODEL
                    }

                }else if(resultJogo.status_code == 404){

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

async function excluirJogo(idJogo) {
    try { 
        if(CORRECTION.CHECK_ID(idJogo)){
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
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function listarTodosJogo() {
    try {
        let resultJogo = await jogoDAO.selectAllJogo()

        if(resultJogo != false || typeof(resultJogo) == 'object'){
            if(resultJogo.length > 0){
                let listaJogo = []

                for(item of resultJogo){
                    let conquistas = await servicesConquistas.buscarConquistasDejogo(item.id)
                    item.achievement = conquistas.achievement

                    let dlcs = await servicesDlc.buscarDlcDeJogo(item.id)
                    item.DLCs = dlcs.DLC

                    let generos = await servicesJogoGenero.buscarJogo_generoDejogo(item.id)
                    item.game_genre = generos.game_genre

                    let plataformas = await servicesJogoPlataforma.buscarJogo_plataformaDeJogo(item.id)
                    item.game_platform = plataformas.game_platform

                    let preco = await servicesPreco.buscarPrecoDeJogo(item.id)
                    item.game_price = preco.game_price

                    listaJogo.push(item)
                }

                let dadosJogos = {
                    "status": true,
                    "status_code": 201,
                    "items": listaJogo.length,
                    "games": listaJogo
                }
                return dadosJogos
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

async function buscarJogo(idJogo) {
    try {
        // console.log(idJogo)
        
        if(CORRECTION.CHECK_ID(idJogo)){
            let resultJogo = await jogoDAO.selectByIdJogo(parseInt(idJogo))

            if(resultJogo != false || typeof(resultJogo) == 'object'){
                if(resultJogo.length > 0){
                    
                    let listaJogo = []

                    for(item of resultJogo){
                        let conquistas = await servicesConquistas.buscarConquistasDejogo(item.id)
                        item.achievement = conquistas.achievement

                        let dlcs = await servicesDlc.buscarDlcDeJogo(item.id)
                        item.DLCs = dlcs.DLC

                        let generos = await servicesJogoGenero.buscarJogo_generoDejogo(item.id)
                        item.game_genre = generos.game_genre

                        let plataformas = await servicesJogoPlataforma.buscarJogo_plataformaDeJogo(item.id)
                        item.game_platform = plataformas.game_platform

                        let preco = await servicesPreco.buscarPrecoDeJogo(item.id)
                        item.game_price = preco.game_price

                        listaJogo.push(item)
                    }

                    let dadosJogos = {
                        "status": true,
                        "status_code": 201,
                        "games": listaJogo
                    }
                    // console.log(util.inspect(dadosJogos, { depth: null }))
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
        console.log(error);
        
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
    }
}

async function buscarJogoQuem(publicador) {
    try {
        // console.log(id)
        
        if(CORRECTION.CHECK_ID(publicador.id)){
            const isEmpresa = publicador.IsItACompany
            const ResultPublicacao = isEmpresa
                ? (await servicesPublicacaoJogoDaEmpresa.buscarPublicacaoDaEmpresa(publicador.id))
                : (await servicesPublicacaoJogoDoUsuario.buscarPublicacaoDoUsario(publicador.id))

            // console.log(ResultPublicacao);
            

            if(ResultPublicacao != false || typeof(ResultPublicacao) == 'object'){
                if(ResultPublicacao.publishing_games.length > 0){
                    
                    let listaJogo = []

                    for(item of ResultPublicacao.publishing_games){
                        let jogo =  await buscarJogo(item.id_jogo)
                        listaJogo.push(jogo)
                    }

                    let dadosJogos = {
                        "status": true,
                        "status_code": 201,
                        "games": listaJogo
                    }
                    // console.log(util.inspect(dadosJogos, { depth: null }))
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
        console.log(error);
        
        return MENSAGE.ERROR_INTERNAL_SERVER_SERVICES
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
    buscarJogo,
    buscarJogoQuem
}