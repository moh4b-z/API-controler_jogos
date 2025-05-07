const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertJogo_plataforma(Jogo_plataforma){
    try {
        
        let sql = `insert IGNORE into tbl_jogo_plataforma (
                                            id_jogo,
                                            id_plataforma                              
                                        ) values (
                                            '${Jogo_plataforma.id_jogo}',
                                            '${Jogo_plataforma.id_plataforma}'
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
async function updateJogo_plataforma(Jogo_plataforma){
    try {
        let sql = `update tbl_jogo_plataforma set  id_jogo = '${Jogo_plataforma.id_jogo}',
                                        id_plataforma = '${Jogo_plataforma.id_plataforma}'                      
                                        
                                where id = ${Jogo_plataforma.id}`
        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deleteJogo_plataforma(idJogo_plataforma){
    try {
        let sql = `DELETE FROM tbl_jogo_plataforma WHERE id = ${idJogo_plataforma}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllJogo_plataforma(){
    try {
        let sql = 'select * from tbl_jogo_plataforma order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdJogo_plataforma(idJogo_plataforma){
    try {
        let sql = `SELECT * FROM tbl_jogo_plataforma WHERE id = ${idJogo_plataforma}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertJogo_plataforma,
    updateJogo_plataforma,
    deleteJogo_plataforma,
    selectAllJogo_plataforma,
    selectByIdJogo_plataforma
}