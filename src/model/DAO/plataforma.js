const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()


// inseri
async function insertPlataforma(plataforma){
    try {        
        let sql = `insert into tbl_plataforma (
                                            nome                                
                                        ) values (
                                            '${plataforma.nome}'
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
async function updatePlataforma(plataforma){
    try {
        let sql = `update tbl_plataforma set      nome = '${plataforma.nome}'                            
                                        
                                where id = ${plataforma.id}`
        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deletePlataforma(idPlataforma){
    try {
        let sql = `DELETE FROM tbl_plataforma WHERE id = ${idPlataforma}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os Plataforma
async function selectAllPlataforma(){
    try {
        let sql = 'select * from tbl_plataforma order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdPlataforma(idPlataforma){
    try {
        let sql = `SELECT * FROM tbl_plataforma WHERE id = ${idPlataforma}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertPlataforma,
    updatePlataforma,
    deletePlataforma,
    selectAllPlataforma,
    selectByIdPlataforma
}