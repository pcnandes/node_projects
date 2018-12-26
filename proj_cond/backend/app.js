'use strict'
// ESTUDAR https://code4coders.wordpress.com/2016/10/14/desenvolvendo-uma-aplicacao-restful-api-em-node-js-express-js-com-mongodb/
var http = require('http')

// permite que valores nulos sejam configurados
// em produção essas variaveis deverão ser configuradas no ambiente nao no .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config({
    allowEmptyValues: true
  })
}

require('jsonwebtoken')
const compression = require('compression')
const express = require('express')
const cors = require('cors')
// const path = require('path')
// var cookieParser = require('cookie-parser');
const logger = require('morgan')

// const indexRoutes = require('./routes/indexRoutes')
const publicRoutes = require('./api/routes/publicRoutes')
const condominioRoutes = require('./api/routes/condominioRoutes')

// const { sequelize } = require('./config/sequelize')
const db = require('./models/index')

var app = express()

app.set('port', process.env.SERVER_PORT || '3000')

// habilita cors domain https://github.com/expressjs/cors
app.use(cors())
if (process.env.NODE_ENV !== 'production') {
  app.use(logger('dev'))
}
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// habilita compressao GZIP na resposta, promete maior velocidade no trafego de dados.. PRECISA TESTAR
app.use(compression())

app.use('/api/public', publicRoutes)
app.use('/api/condominio', condominioRoutes)

// iniciar o servidor após subir o banco
db.sequelize.sync({ force: false }).then(() => {
  console.log(`base de dados e tabelas criados!`)
  var server = http.createServer(app)
  server.listen(process.env.SERVER_PORT || '3000')

  // TODO verificar se nao seria interessante usar uma ferramenta de Debug aqui. Ver /bin/www
  // servidor iniciado
  server.on('listening', () => console.log(`Server está rodando na porta ${process.env.PORT || '3000'}`))
  // erro
  server.on('error', (error) => console.log(`Ocorreu um erro: ${error}`))
})

module.exports = app
