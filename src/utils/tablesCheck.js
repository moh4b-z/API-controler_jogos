const CORRECTION = require("./inputCheck")


function CHECK_tbl_jogo(jogo){
    // console.log(CORRECTION.CHECK_VARCHAR(jogo.tamanho, 10), jogo.tamanho)
    // console.log(
    //     CORRECTION.CHECK_VARCHAR_NOT_NULL(jogo.nome, 80) ,
    //     CORRECTION.CHECK_VARCHAR_NOT_NULL(jogo.data_lancamento, 10),
    //     CORRECTION.CHECK_VARCHAR_NOT_NULL(jogo.versao, 10),
    //     CORRECTION.CHECK_VARCHAR(jogo.tamanho, 10),
    //     CORRECTION.CHECK_UNDEFINED(jogo.descricao) ,
    //     CORRECTION.CHECK_VARCHAR(jogo.foto_capa, 250) ,
    //     CORRECTION.CHECK_VARCHAR(jogo.link, 250)
    // );
    
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(jogo.nome, 80) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(jogo.data_lancamento, 10) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(jogo.versao, 10) &&
        CORRECTION.CHECK_VARCHAR(jogo.tamanho, 10) &&
        CORRECTION.CHECK_UNDEFINED(jogo.descricao) &&
        CORRECTION.CHECK_VARCHAR(jogo.foto_capa, 250) &&
        CORRECTION.CHECK_VARCHAR(jogo.link, 250)
    ){
        return true
    }else{
        return false
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
        CORRECTION.CHECK_VARCHAR(tipo_pagamento.logo, 250)
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
        CORRECTION.CHECK_VARCHAR(plataforma.logo, 250)
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
        CORRECTION.CHECK_VARCHAR(paises.bandeira, 250) 
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
function CHECK_tbl_jogo_genero(jogo_genero){    
    if(
        CORRECTION.CHECK_ID(jogo_genero.id_jogo) &&
        CORRECTION.CHECK_ID(jogo_genero.id_genero)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_preco(preco){    
    if(
        CORRECTION.CHECK_DECIMAL_NOT_NULL(preco.valor, 7, 2) &&
        CORRECTION.CHECK_ID(preco.id_jogo) &&
        CORRECTION.CHECK_ID(preco.id_plataforma) &&
        CORRECTION.CHECK_ID(preco.id_paises) &&
        CORRECTION.CHECK_ID(preco.id_tipo_pagamento)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_jogo_plataforma(jogo_plataforma){    
    if(
        CORRECTION.CHECK_ID(jogo_plataforma.id_jogo) &&
        CORRECTION.CHECK_ID(jogo_plataforma.id_plataforma)
    ){
        return true
    }else{
        return false
    }
}


function CHECK_tbl_usuario(usuario){ 
    
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_salt, 32) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.senha_hash, 128) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.email, 100) &&
        CORRECTION.CHECK_UNDEFINED(usuario.biografia) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.data_de_nascimento, 10) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.nome, 50) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(usuario.foto_perfil, 250) &&
        CORRECTION.CHECK_ID(usuario.id_paises) &&
        CORRECTION.CHECK_ID(usuario.id_sexo)
    ){
        return true
    }else{
        return false
    }
}


function CHECK_tbl_empresa(empresa){       
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(empresa.senha_salt, 32) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(empresa.senha_hash, 128) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(empresa.email, 100) &&
        CORRECTION.CHECK_UNDEFINED(empresa.biografia) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(empresa.data_de_fundacao, 10) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(empresa.nome, 50) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(empresa.foto, 250) &&
        CORRECTION.CHECK_ID(empresa.id_paises)
    ){
        return true
    }else{
        return false
    }
}


function CHECK_tbl_publicacao_jogo_da_empresa(publicacao){    
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(publicacao.data_de_publicacao, 10) &&
        CORRECTION.CHECK_ID(publicacao.id_empresa) &&
        CORRECTION.CHECK_ID(publicacao.id_jogo)
    ){
        return true
    }else{
        return false
    }
}

function CHECK_tbl_publicacao_jogo_do_usuario(publicacao){    
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(publicacao.data_de_publicacao, 10) &&
        CORRECTION.CHECK_ID(publicacao.id_usuario) &&
        CORRECTION.CHECK_ID(publicacao.id_jogo)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_avaliacao(avaliacao){    
    if(
        CORRECTION.CHECK_UNDEFINED(avaliacao.comentario) &&
        CORRECTION.CHECK_pontuacao(avaliacao.pontuacao) &&
        CORRECTION.CHECK_ID(avaliacao.id_usuario) &&
        CORRECTION.CHECK_ID(avaliacao.id_jogo)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_compra_jogo(compra){    
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(compra.data_compra, 10) &&
        CORRECTION.CHECK_VARCHAR_NOT_NULL(compra.comprovante, 250) &&
        CORRECTION.CHECK_ID(compra.id_usuario) &&
        CORRECTION.CHECK_ID(compra.id_preco)
    ){
        return true
    }else{
        return false
    }
}
function CHECK_tbl_usuario_conquistas(conquistas){    
    if(
        CORRECTION.CHECK_VARCHAR_NOT_NULL(conquistas.data_de_conquista, 10) &&
        CORRECTION.CHECK_ID(conquistas.id_usuario) &&
        CORRECTION.CHECK_ID(conquistas.id_conquistas)
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
    CHECK_tbl_jogo_genero,
    CHECK_tbl_jogo_plataforma,
    CHECK_tbl_preco,

    CHECK_tbl_usuario,
    CHECK_tbl_empresa,

    CHECK_tbl_publicacao_jogo_da_empresa,
    CHECK_tbl_publicacao_jogo_do_usuario,

    CHECK_tbl_avaliacao,
    CHECK_tbl_usuario_conquistas,
    CHECK_tbl_compra_jogo
}