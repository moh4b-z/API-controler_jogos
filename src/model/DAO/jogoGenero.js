const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertJogo_genero(Jogo_genero){
    try {
        
        let sql = `insert IGNORE into tbl_jogo_genero (
                                            id_jogo,
                                            id_genero                              
                                        ) values (
                                            '${Jogo_genero.id_jogo}',
                                            '${Jogo_genero.id_genero}'
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
async function updateJogo_genero(Jogo_genero){
    try {
        let sql = `update tbl_jogo_genero set  id_jogo = '${Jogo_genero.id_jogo}',
                                        id_genero = '${Jogo_genero.id_genero}'                      
                                        
                                where id = ${Jogo_genero.id}`
        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deleteJogo_genero(idJogo_genero){
    try {
        let sql = `DELETE FROM tbl_jogo_genero WHERE id = ${idJogo_genero}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllJogo_genero(){
    try {
        let sql = 'select * from tbl_jogo_genero order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdJogo_genero(idJogo_genero){
    try {
        let sql = `SELECT * FROM tbl_jogo_genero WHERE id = ${idJogo_genero}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}
// filtro pelo ID do jogo
async function selectByIdJogo_generoDejogo(id_jogo){
    try {
        let sql = `SELECT * FROM tbl_jogo_genero WHERE id_jogo = ${id_jogo}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertJogo_genero,
    updateJogo_genero,
    deleteJogo_genero,
    selectAllJogo_genero,
    selectByIdJogo_genero,
    selectByIdJogo_generoDejogo
}