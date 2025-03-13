/*************************************************************************
Objetiv: API  referente ao projeto de controle
Data: 13/02/2025
Autor: Mohammmad
Versão: 1.0
* Observação:
**********  Para configura e instalar a API, precisamos das 
            seguintes bibliotecas:
                express         npm install express --save 

                cors            npm install cors --save 

                body-parser     npm install body-parser --save   
**********  Para configura e instalar o acesso ao Banco de dados, 
            precisamos baixar:
                prisma          npm install prisma --save (conexão com o BD)

                prisma/client   npm install @prisma/client --save   (Executa scripts no BD)

            Após a instalação completa do prisma deve rodar:
                comando         npx prisma init

            Para realizzar o sincronismo do prisma com BD, devemos executa o seguinte comando:
                comando        npx prisma migrate dev
************************************************************************/


const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const controllerJogo = require('.//controller/jogo/controllerJogo')

// só quando for POST ou PUT
const bodyParserJSON = bodyParser.json()

const app = express()

app.use((request, response, next) =>{

    response.header('Acces-Control-Allow-Origin', '*')
    response.header('Acces-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS')

    app.use(cors()) 

    next()
})

app.post('/v1/controle-jogos/jogo', cors(), bodyParserJSON, async function(request, response) {
    let contentType = request.headers['content-type']
    
    let dadosBody = request.body

    let resultJogo = await controllerJogo.inserirJogo(dadosBody, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.get('/v1/controle-jogos/jogo/listar', cors(), async function(request, response) {
    let resultJogo = await controllerJogo.listarTodosJogo()

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.get('/v1/controle-jogos/jogo/listar/:idJogo', cors(), async function(request, response) {
    let idJogo = request.params.idJogo
    let resultJogo = await controllerJogo.buscarJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})

app.delete('/v1/controle-jogos/jogo/deletar/:idJogo', cors(), async function(request, response) {
    let idJogo = request.params.idJogo
    let resultJogo = await controllerJogo.excluirJogo(idJogo)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})
app.put('/v1/controle-jogos/jogo/atualizar/:idJogo', cors(), bodyParserJSON, async function(request, response) {
    let idJogo = request.params.idJogo
    let contentType = request.headers['content-type']
    let dadosBody = request.body
    let resultJogo = await controllerJogo.atualizarJogo(dadosBody, idJogo, contentType)

    response.status(resultJogo.status_code)
    response.json(resultJogo)
})



const port = process.env.PORT || 8080
app.listen(port, function(){
    console.log('API aguardando requisição ...')
})