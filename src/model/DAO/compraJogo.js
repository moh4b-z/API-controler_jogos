const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertCompraJogo(CompraJogo){
    try {
        
        let sql = `insert into tbl_compra_jogo (
                                            data_compra,
                                            comprovante,
                                            id_preco,
                                            id_usuario                              
                                        ) values (
                                            '${CompraJogo.data_compra}',
                                            '${CompraJogo.comprovante}',
                                            '${CompraJogo.id_preco}',
                                            '${CompraJogo.id_usuario}'
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
async function updateCompraJogo(CompraJogo){
    try {
        let sql = `update tbl_compra_jogo set  data_compra = '${CompraJogo.data_compra}',
                                        comprovante = '${CompraJogo.comprovante}',                      
                                        id_preco = '${CompraJogo.id_preco}',                      
                                        id_usuario = '${CompraJogo.id_usuario}'                      
                                        
                                where id = ${CompraJogo.id}`
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deleteCompraJogo(idCompraJogo){
    try {
        let sql = `DELETE FROM tbl_compra_jogo WHERE id = ${idCompraJogo}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllCompraJogo(){
    try {
        let sql = 'select * from tbl_compra_jogo order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdCompraJogo(idCompraJogo){
    try {
        let sql = `SELECT * FROM tbl_compra_jogo WHERE id = ${idCompraJogo}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertCompraJogo,
    updateCompraJogo,
    deleteCompraJogo,
    selectAllCompraJogo,
    selectByIdCompraJogo
}