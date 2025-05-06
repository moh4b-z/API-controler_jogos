const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertAvaliacao(Avaliacao){
    try {
        
        let sql = `insert into tbl_avaliacao (
                                            comentario,
                                            pontuacao,
                                            id_jogo,
                                            id_usuario                              
                                        ) values (
                                            '${Avaliacao.comentario}',
                                            '${Avaliacao.pontuacao}',
                                            '${Avaliacao.id_jogo}',
                                            '${Avaliacao.id_usuario}'
                                        )`

        //executar script no BD        
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error)
        return false
    }
}

// atualizar
async function updateAvaliacao(Avaliacao){
    try {
        let sql = `update tbl_avaliacao set  comentario = '${Avaliacao.comentario}',
                                        pontuacao = '${Avaliacao.pontuacao}',                      
                                        id_jogo = '${Avaliacao.id_jogo}',                      
                                        id_usuario = '${Avaliacao.id_usuario}'                      
                                        
                                where id = ${Avaliacao.id}`
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deleteAvaliacao(idAvaliacao){
    try {
        let sql = `DELETE FROM tbl_avaliacao WHERE id = ${idAvaliacao}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllAvaliacao(){
    try {
        let sql = 'select * from tbl_avaliacao order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdAvaliacao(idAvaliacao){
    try {
        let sql = `SELECT * FROM tbl_avaliacao WHERE id = ${idAvaliacao}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertAvaliacao,
    updateAvaliacao,
    deleteAvaliacao,
    selectAllAvaliacao,
    selectByIdAvaliacao
}