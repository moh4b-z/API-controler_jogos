const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertTipo_pagamento(tipo_pagamento){
    try {
        
        let sql = `insert into tbl_tipo_pagamento (
                                            tipo,
                                            logo                            
                                        ) values (
                                            '${tipo_pagamento.tipo}',
                                            '${tipo_pagamento.logo}'
                                        )`

        //executar script no BD        
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.log(error)
        return false
    }
}

// atualizar
async function updateTipo_pagamento(tipo_pagamento){
    try {
        let sql = `update tbl_tipo_pagamento set  tipo = '${tipo_pagamento.tipo}',
                                                logo = '${tipo_pagamento.logo}'                   
                                        
                                where id = ${tipo_pagamento.id}`
        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        console.log(error);
        
        return false
    }
}

// deletar
async function deleteTipo_pagamento(idTipo_pagamento){
    try {
        let sql = `DELETE FROM tbl_tipo_pagamento WHERE id = ${idTipo_pagamento}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os Tipo_pagamento
async function selectAllTipo_pagamento(){
    try {
        let sql = 'select * from tbl_tipo_pagamento order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdTipo_pagamento(idTipo_pagamento){
    try {
        let sql = `SELECT * FROM tbl_tipo_pagamento WHERE id = ${idTipo_pagamento}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertTipo_pagamento,
    updateTipo_pagamento,
    deleteTipo_pagamento,
    selectAllTipo_pagamento,
    selectByIdTipo_pagamento
}