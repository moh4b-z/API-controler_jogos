const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertSexo(sexo){
    try {
        
        let sql = `insert into tbl_sexo (
                                            nome,
                                            sigla                              
                                        ) values (
                                            '${sexo.nome}',
                                            '${sexo.sigla}'
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
async function updateSexo(sexo){
    try {
        let sql = `update tbl_sexo set  nome = '${sexo.nome}',
                                        sigla = '${sexo.sigla}',                          
                                        
                                where id = ${sexo.id}`
        // console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deleteSexo(idSexo){
    try {
        let sql = `DELETE FROM tbl_sexo WHERE id = ${idSexo}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllSexo(){
    try {
        let sql = 'select * from tbl_sexo order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdSexo(idSexo){
    try {
        let sql = `SELECT * FROM tbl_sexo WHERE id = ${idSexo}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertSexo,
    updateSexo,
    deleteSexo,
    selectAllSexo,
    selectByIdSexo
}