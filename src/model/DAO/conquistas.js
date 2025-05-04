const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertConquistas(Conquistas){
    try {
        
        let sql = `insert into tbl_conquistas (
                                            nome,
                                            descricao,
                                            id_jogo                  
                                        ) values (
                                            '${Conquistas.nome}',
                                            '${Conquistas.descricao}',
                                            '${Conquistas.id_jogo}'
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
async function updateConquistas(Conquistas){
    try {
        let sql = `update tbl_conquistas set  nome = '${Conquistas.nome}',
                                        descricao = '${Conquistas.descricao}',             
                                        id_jogo = '${Conquistas.id_jogo}'                  
                                        
                                where id = ${Conquistas.id}`
        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deleteConquistas(idConquistas){
    try {
        let sql = `DELETE FROM tbl_conquistas WHERE id = ${idConquistas}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllConquistas(){
    try {
        let sql = 'select * from tbl_conquistas order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdConquistas(idConquistas){
    try {
        let sql = `SELECT * FROM tbl_conquistas WHERE id = ${idConquistas}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertConquistas,
    updateConquistas,
    deleteConquistas,
    selectAllConquistas,
    selectByIdConquistas
}