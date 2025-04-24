const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// inseri
async function insertDlc(Dlc){
    try {
        
        let sql = `insert into tbl_dlc (
                                            id_jogo_principal,
                                            id_jogo_dlc                              
                                        ) values (
                                            '${Dlc.id_jogo_principal}',
                                            '${Dlc.id_jogo_dlc}'
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
async function updateDlc(Dlc){
    try {
        let sql = `update tbl_dlc set  id_jogo_principal = '${Dlc.id_jogo_principal}',
                                        id_jogo_dlc = '${Dlc.id_jogo_dlc}'                      
                                        
                                where id = ${Dlc.id}`
        console.log(sql);
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deleteDlc(idDlc){
    try {
        let sql = `DELETE FROM tbl_dlc WHERE id = ${idDlc}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllDlc(){
    try {
        let sql = 'select * from tbl_dlc order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdDlc(idDlc){
    try {
        let sql = `SELECT * FROM tbl_dlc WHERE id = ${idDlc}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertDlc,
    updateDlc,
    deleteDlc,
    selectAllDlc,
    selectByIdDlc
}