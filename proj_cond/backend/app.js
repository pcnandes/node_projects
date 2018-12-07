// ESTUDAR https://code4coders.wordpress.com/2016/10/14/desenvolvendo-uma-aplicacao-restful-api-em-node-js-express-js-com-mongodb/

// require('dotenv-safe').load()
// permite que valores nulos sejam configurados
// em produção essas variaveis deverão ser configuradas no ambiente nao no .env
if (process.env.NODE_ENV !== 'production') {
  require('dotenv-safe').config({
    allowEmptyValues: true
  })
  // caso esteja rodando os testes a aplicação vai acessar outro banco
  if (process.env.NODE_ENV === 'test') {
    process.env.DB_NAME = process.env.DB_NAME_TEST
  }
}

require('jsonwebtoken')
const compression = require('compression')
const express = require('express')
const cors = require('cors')
// const path = require('path')
// var cookieParser = require('cookie-parser');
const logger = require('morgan')

// const indexRoutes = require('./routes/indexRoutes')
const publicRoutes = require('./routes/publicRoutes')
const condominioRoutes = require('./routes/condominioRoutes')

var app = express()
// habilita cors domain https://github.com/expressjs/cors
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
// habilita compressao GZIP na resposta, promete maior velocidade no trafego de dados.. PRECISA TESTAR
app.use(compression())

// app.use('/', indexRoutes)
app.use('/api/public', publicRoutes)
app.use('/api/condominio', condominioRoutes)

module.exports = app
