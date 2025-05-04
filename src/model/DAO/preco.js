const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertPreco(Preco){
    try {
        
        let sql = `insert into tbl_preco (
                                            valor,
                                            id_jogo,
                                            id_paises,
                                            id_plataforma,                  
                                            id_tipo_pagamento                   
                                        ) values (
                                            '${Preco.valor}',
                                            '${Preco.id_jogo}',
                                            '${Preco.id_paises}',
                                            '${Preco.id_plataforma}',
                                            '${Preco.id_tipo_pagamento}'
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
async function updatePreco(Preco){
    try {
        let sql = `update tbl_preco set  valor = '${Preco.valor}',
                                        id_jogo = '${Preco.id_jogo}',             
                                        id_paises = '${Preco.id_paises}',                   
                                        id_plataforma = '${Preco.id_plataforma}',                   
                                        id_tipo_pagamento = '${Preco.id_tipo_pagamento}'                   
                                        
                                where id = ${Preco.id}`
        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deletePreco(idPreco){
    try {
        let sql = `DELETE FROM tbl_preco WHERE id = ${idPreco}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllPreco(){
    try {
        let sql = 'select * from tbl_preco order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdPreco(idPreco){
    try {
        let sql = `SELECT * FROM tbl_preco WHERE id = ${idPreco}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertPreco,
    updatePreco,
    deletePreco,
    selectAllPreco,
    selectByIdPreco
}