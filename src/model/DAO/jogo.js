/*************************************************************************
Objetiv: model responsável pelo CRUD de dados referente a jogos no Banco de Dados
Data: 13/02/2025
Autor: Mohammmad
Versão: 1.0
************************************************************************/

const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertJogo(jogo) {
    try {
        const novoJogo = await prisma.tbl_jogo.create({
            data: {
                nome: jogo.nome,
                data_lancamento: new Date(jogo.data_lancamento),
                versao: jogo.versao,
                tamanho: jogo.tamanho,
                descricao: jogo.descricao,
                foto_capa: jogo.foto_capa,
                link: jogo.link
            }
        });

        return novoJogo; // retorna o objeto completo
    } catch (error) {
        console.log(error);
        return null;
    }
}


// atualizar
async function updateJogo(jogo){
    try {
        let sql = `update tbl_jogo set      nome = '${jogo.nome}',
                                            data_lancamento = '${jogo.data_lancamento}',
                                            versao = '${jogo.versao}',
                                            tamanho = '${jogo.tamanho}',
                                            descricao = '${jogo.descricao}',
                                            foto_capa = '${jogo.foto_capa}',
                                            link = '${jogo.link}'                             
                                        
                                where id = ${jogo.id}`
        // console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deleteJogo(idJogo){
    try {
        let sql = `DELETE FROM tbl_jogo WHERE id = ${idJogo}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllJogo(){
    try {
        let sql = 'select * from tbl_jogo order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdJogo(idJogo){
    try {
        let sql = `SELECT * FROM tbl_jogo WHERE id = ${idJogo}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertJogo,
    updateJogo,
    deleteJogo,
    selectAllJogo,
    selectByIdJogo
}