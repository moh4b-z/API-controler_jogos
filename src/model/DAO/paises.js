const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertPaises(paises){
    try {
        
        let sql = `insert into tbl_paises (
                                            nome,
                                            sigla,
                                            moeda                               
                                        ) values (
                                            '${paises.nome}',
                                            '${paises.sigla}',
                                            '${paises.moeda}'
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
async function updatePaises(paises){
    try {
        let sql = `update tbl_paises set    nome = '${paises.nome}',
                                            sigla = '${paises.sigla}',
                                            moeda = '${paises.moeda}'                            
                                        
                                where id = ${paises.id}`
        // console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deletePaises(idPaises){
    try {
        let sql = `DELETE FROM tbl_paises WHERE id = ${idPaises}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllPaises(){
    try {
        let sql = 'select * from tbl_paises order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdPaises(idPaises){
    try {
        let sql = `SELECT * FROM tbl_paises WHERE id = ${idPaises}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertPaises,
    updatePaises,
    deletePaises,
    selectAllPaises,
    selectByIdPaises
}