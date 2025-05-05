const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertEmpresa(Empresa){
    try {
        
        let sql = `insert into tbl_empresa (
                                            nome,
                                            senha_salt,
                                            senha_hash,
                                            email,
                                            data_de_fundacao,
                                            biografia,
                                            foto,
                                            id_paises              
                                        ) values (
                                            '${Empresa.nome}',
                                            '${Empresa.senha_salt}',
                                            '${Empresa.senha_hash}',
                                            '${Empresa.email}',
                                            '${Empresa.data_de_fundacao}',
                                            '${Empresa.biografia}',
                                            '${Empresa.foto}',
                                            '${Empresa.id_paises}'
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
async function updateEmpresa(Empresa){
    try {
        let sql = `update tbl_empresa set  nome = '${Empresa.nome}',
                                        senha_salt = '${Empresa.senha_salt}',
                                        senha_hash = '${Empresa.senha_hash}',
                                        email = '${Empresa.email}',
                                        data_de_fundacao = '${Empresa.data_de_fundacao}',
                                        biografia = '${Empresa.biografia}',
                                        foto = '${Empresa.foto}',
                                        id_paises = '${Empresa.id_paises}'               
                                        
                                where id = ${Empresa.id}`
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error)        
        return false
    }
}

// deletar
async function deleteEmpresa(idEmpresa){
    try {
        let sql = `DELETE FROM tbl_empresa WHERE id = ${idEmpresa}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllEmpresa(){
    try {
        let sql = 'select * from tbl_empresa order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdEmpresa(idEmpresa){
    try {
        let sql = `SELECT * FROM tbl_empresa WHERE id = ${idEmpresa}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertEmpresa,
    updateEmpresa,
    deleteEmpresa,
    selectAllEmpresa,
    selectByIdEmpresa
}