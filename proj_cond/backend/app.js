'use strict'
// ESTUDAR https://code4coders.wordpress.com/2016/10/14/desenvolvendo-uma-aplicacao-restful-api-em-node-js-express-js-com-mongodb/
const http = require('http')

// permite que valores nulos sejam configurados
// em produção essas variaveis deverão ser configuradas no ambiente nao no .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config({
    allowEmptyValues: true
  })
}

const app = require('./server/api')

// carrego os modelos e as configurações do banco
const db = require('./server/models')

// iniciar o servidor após subir o banco
db.sequelize.sync({ force: false }).then(() => {
  console.log(`base de dados e tabelas criados!`)
  const server = http.createServer(app)
  server.listen(process.env.SERVER_PORT || '3000')

  // TODO verificar se nao seria interessante usar uma ferramenta de Debug aqui. Ver /bin/www
  // servidor iniciado
  server.on('listening', () => console.log(`Server está rodando na porta ${process.env.PORT || '3000'}`))
  // erro
  server.on('error', (error) => console.log(`Ocorreu um erro: ${error}`))
})

module.exports = app
