const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertGenero(genero){
    try {        
        let sql = `insert into tbl_genero (
                                            nome                                
                                        ) values (
                                            '${genero.nome}'
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
async function updateGenero(genero){
    try {
        let sql = `update tbl_genero set      nome = '${genero.nome}'                            
                                        
                                where id = ${genero.id}`
        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deleteGenero(idGenero){
    try {
        let sql = `DELETE FROM tbl_genero WHERE id = ${idGenero}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os Genero
async function selectAllGenero(){
    try {
        let sql = 'select * from tbl_genero order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdGenero(idGenero){
    try {
        let sql = `SELECT * FROM tbl_genero WHERE id = ${idGenero}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertGenero,
    updateGenero,
    deleteGenero,
    selectAllGenero,
    selectByIdGenero
}