const { PrismaClient } = require('@prisma/client')
//Instancia da classe do prisma client, para gera um objeto
const prisma = new PrismaClient()

// Inserir publicação de jogo por empresa
async function insertPublicacao(publicacao) {
    try {
        const result = await prisma.tbl_publicacao_jogo_da_empresa.create({
            data: {
                data_de_publicacao: new Date(publicacao.data_de_publicacao),
                id_empresa: publicacao.id_empresa,
                id_jogo: publicacao.id_jogo
            }
        })

        return result
    } catch (error) {
        console.log(error)
        return false
    }
}


// atualizar
async function updatePublicacao(Publicacao){
    try {
        let sql = `update tbl_publicacao_jogo_da_empresa set  data_de_publicacao = '${Publicacao.data_de_publicacao}',
                                        id_empresa = '${Publicacao.id_empresa}',                    
                                        id_jogo = '${Publicacao.id_jogo}'                     
                                        
                                where id = ${Publicacao.id}`
        console.log(sql)
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

// deletar
async function deletePublicacao(idPublicacao){
    try {
        let sql = `DELETE FROM tbl_publicacao_jogo_da_empresa WHERE id = ${idPublicacao}`
        let result = await prisma.$executeRawUnsafe(sql)

        return result ? true : false
    } catch (error) {
        return false
    }
}

// select de todos os jogos
async function selectAllPublicacao(){
    try {
        let sql = 'select * from tbl_publicacao_jogo_da_empresa order by id desc'
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        return false
    }
}

// filtro pelo ID
async function selectByIdPublicacao(idPublicacao){
    try {
        let sql = `SELECT * FROM tbl_publicacao_jogo_da_empresa WHERE id = ${idPublicacao}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}
// filtro pelo ID empresa
async function selectByIdPublicacaoDaEmpresa(idPublicacao){
    try {
        let sql = `SELECT * FROM tbl_publicacao_jogo_da_empresa WHERE id_empresa = ${idPublicacao}`
        // console.log(sql);
        
        let result = await prisma.$queryRawUnsafe(sql)

        return result ? result : false
    } catch (error) {
        // console.log(error);
        
        return false
    }
}

module.exports = {
    insertPublicacao,
    updatePublicacao,
    deletePublicacao,
    selectAllPublicacao,
    selectByIdPublicacao,
    selectByIdPublicacaoDaEmpresa
}