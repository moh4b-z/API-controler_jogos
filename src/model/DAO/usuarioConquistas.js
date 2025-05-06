const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertUsuarioConquistas(UsuarioConquistas){
    try {
        
        let sql = `insert into tbl_usuario_conquistas (
                                            realizada,
                                            id_conquistas,
                                            id_usuario                              
                                        ) values (
                                            '${UsuarioConquistas.realizada}',
                                            '${UsuarioConquistas.id_conquistas}',
                                            '${UsuarioConquistas.id_usuario}'
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
async function updateUsuarioConquistas(UsuarioConquistas){
    try {
        let sql = `update tbl_usuario_conquistas set  realizada = '${UsuarioConquistas.realizada}',                  
                                        id_conquistas = '${UsuarioConquistas.id_conquistas}',                    
                                        id_usuario = '${UsuarioConquistas.id_usuario}'                      
                                        
                                where id = ${UsuarioConquistas.id}`
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deleteUsuarioConquistas(idUsuarioConquistas){
    try {
        let sql = `DELETE FROM tbl_usuario_conquistas WHERE id = ${idUsuarioConquistas}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllUsuarioConquistas(){
    try {
        let sql = 'select * from tbl_usuario_conquistas order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdUsuarioConquistas(idUsuarioConquistas){
    try {
        let sql = `SELECT * FROM tbl_usuario_conquistas WHERE id = ${idUsuarioConquistas}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertUsuarioConquistas,
    updateUsuarioConquistas,
    deleteUsuarioConquistas,
    selectAllUsuarioConquistas,
    selectByIdUsuarioConquistas
}