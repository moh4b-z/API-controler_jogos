const CORRECTION = require("./inputCheck")


function CHECK_tbl_jogo(jogo){
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(jogo.nome, 80) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(jogo.data_lancamento, 10) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(jogo.versao, 10) &&
        CORRECTION.CHECK_VARCHAR(jogo.tamanho, 10) &&
        CORRECTION.CHECK_UNDEFINED(jogo.descricao) &&
        CORRECTION.CHECK_VARCHAR(jogo.foto_capa, 200) &&
        CORRECTION.CHECK_VARCHAR(jogo.link, 200)
    ){
        return false
    }else{
        return true
    }
}
function CHECK_tbl_genero(genero){
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(genero.nome, 45)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_tipo_pagamento(tipo_pagamento){
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(tipo_pagamento.tipo, 50) &&
        CORRECTION.CHECK_VARCHAR(tipo_pagamento.logo, 200)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_plataforma(plataforma){
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(plataforma.nome, 45) &&
        CORRECTION.CHECK_DECIMAL_NOT_NULL(plataforma.taxa, 4, 2) &&
        CORRECTION.CHECK_VARCHAR(plataforma.logo, 200)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_paises(paises){
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(paises.nome, 50) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(paises.sigla, 4) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(paises.moeda, 30) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(paises.simbolo_de_moeda, 4) &&
        CORRECTION.CHECK_VARCHAR(paises.bandeira, 200) 
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_dlc(dlc){    
    if(
        CORRECTION.CHECK_ID(dlc.id_jogo_principal) &&
        CORRECTION.CHECK_ID(dlc.id_jogo_dlc)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_sexo(sexo){
    // console.log(sexo);
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(sexo.nome, 50) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(sexo.sigla, 3)
    ){
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

    CHECK_tbl_dlc,
}