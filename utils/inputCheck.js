

function verificarAtributosJogo(jogo){
    if(
        corrigirNotNullVarchar(jogo.nome, 80) ||
        corrigirNotNullVarchar(jogo.data_lancamento, 10) ||
        corrigirNotNullVarchar(jogo.versao, 10) ||
        corrigirVarchar(jogo.tamanho, 10) ||
        corrigirUndefined(jogo.descricao) ||
        corrigirVarchar(jogo.foto_capa, 200) ||
        corrigirVarchar(jogo.link, 200)
    ){
        return true
    }else{
        return false
    }
}

function verificarID(id){
    let numero = id
    if(numero == undefined || numero == "" || numero == null || isNaN(numero) || numero <= 0){
        numero = true
    }else(
        numero = false
    )
    return numero
}
function verificarID1(id){
    let numero = id
    if(numero == undefined || numero == "" || numero == null || isNaN(numero) || numero <= 0){
        numero = false
    }else(
        numero = true
    )
    return numero
}
function verificarNumero(number){
    let numero = Number(number)
    if(numero == undefined || numero == "" || numero == null || isNaN(numero)){
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
    verificarAtributosJogo,
    verificarID,
    verificarNumero,
    corrigirNotNullVarchar,
    corrigirVarchar,
    corrigirUndefined,
    verificarID1
}