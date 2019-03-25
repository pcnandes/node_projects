require('jsonwebtoken')
const compression = require('compression')
const express = require('express')
const cors = require('cors')
// const path = require('path')
// var cookieParser = require('cookie-parser');
const logger = require('morgan')
const errorHandlerApi = require('./responses/errorHandlerApi')

// const indexRoutes = require('./routes/indexRoutes')
const publicRoutes = require('./routes/publicRoutes')
const condominioRoutes = require('./routes/condominioRoutes')
const unidadeRoutes = require('./routes/unidadeRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')
const funcionarioRoutes = require('./routes/funcionarioRoutes')

const app = express()

// app.set('port', process.env.SERVER_PORT || '3000')

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

// modulo responsável por capturar erros PRECISO TESTAR
app.use(errorHandlerApi)

app.use('/api/public', publicRoutes)
app.use('/api/condominio', condominioRoutes)
app.use('/api/unidade', unidadeRoutes)
app.use('/api/usuario', usuarioRoutes)
app.use('/api/funcionario', funcionarioRoutes)

module.exports = app
