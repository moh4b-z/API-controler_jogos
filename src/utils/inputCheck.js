

function CHECK_tbl_jogo(jogo){
    if(
        CHECK_VARCHAR_NOT_NULL(jogo.nome, 80) &&
        CHECK_VARCHAR_NOT_NULL(jogo.data_lancamento, 10) &&
        CHECK_VARCHAR_NOT_NULL(jogo.versao, 10) &&
        CHECK_VARCHAR(jogo.tamanho, 10) &&
        CHECK_UNDEFINED(jogo.descricao) &&
        CHECK_VARCHAR(jogo.foto_capa, 200) &&
        CHECK_VARCHAR(jogo.link, 200)
    ){
        return false
    }else{
        return true
    }
}
function CHECK_tbl_genero(genero){
    if(
        CHECK_VARCHAR_NOT_NULL(genero.nome, 45)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_tipo_pagamento(tipo_pagamento){
    if(
        CHECK_VARCHAR_NOT_NULL(tipo_pagamento.tipo, 50)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_plataforma(plataforma){
    if(
        CHECK_VARCHAR_NOT_NULL(plataforma.nome, 45)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_paises(paises){
    if(
        CHECK_VARCHAR_NOT_NULL(paises.nome, 50) &&
        CHECK_VARCHAR_NOT_NULL(paises.sigla, 4) &&
        CHECK_VARCHAR_NOT_NULL(paises.moeda, 30)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_sexo(sexo){
    // console.log(sexo);
    
    if(
        CHECK_VARCHAR_NOT_NULL(sexo.nome, 50) &&
        CHECK_VARCHAR_NOT_NULL(sexo.sigla, 3)
    ){
        return true
    }else{
        return false
    }
}



function CHECK_ID(id){
    if( !(CHECK_NOT_NULL(id)) || isNaN(id) || id <= 0){
        return false
    }else{
        return true
    }
}

// console.log(!(CHECK_ID("1")));

function verificarNumero(number){
    let numero = Number(number)
    if(numero == undefined || numero == "" || numero == null || isNaN(numero)){
        numero = false
    }
    return numero
}


function CHECK_VARCHAR_NOT_NULL(text, letters){
    // console.log(text + " - " + letters)
    if(!(CHECK_NOT_NULL(text)) || !(CHECK_VARCHAR(text, letters))){
        return false
    }else{
        return true
    }
}

function CHECK_NOT_NULL(attribute){
    if(attribute == undefined || attribute == "" || attribute == null){
        return false
    }else{
        return true
    }
}

function CHECK_VARCHAR(text, letters){
    if(text == undefined || text.length > letters){
        return false
    }else{
        return true
    }
}
function CHECK_UNDEFINED(text){
    if(text == undefined){
        return true
    }else{
        return false
    }
}


module.exports = {
    CHECK_tbl_jogo,
    CHECK_tbl_genero,
    CHECK_tbl_paises,
    CHECK_tbl_sexo,
    CHECK_tbl_tipo_pagamento,
    CHECK_tbl_plataforma,

    
    CHECK_ID,
    verificarNumero,
    CHECK_VARCHAR_NOT_NULL,
    CHECK_VARCHAR,
    CHECK_UNDEFINED
}