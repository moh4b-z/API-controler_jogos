
function verificarID(id){
    let numero = Number(id)
    if(numero == undefined || numero == "" || numero == null || isNaN(numero) || numero <= 0){
        numero = false
    }
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
    verificarID,
    verificarNumero,
    corrigirNotNullVarchar,
    corrigirVarchar,
    corrigirUndefined
}