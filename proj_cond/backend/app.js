// ESTUDAR https://code4coders.wordpress.com/2016/10/14/desenvolvendo-uma-aplicacao-restful-api-em-node-js-express-js-com-mongodb/

// require('dotenv-safe').load()
// permite que valores nulos sejam configurados
require('dotenv-safe').config({
  allowEmptyValues: true
})
require('jsonwebtoken')
const express = require('express')
const cors = require('cors')
// const path = require('path')
// var cookieParser = require('cookie-parser');
const logger = require('morgan')

const indexRoutes = require('./routes/indexRoutes')
const publicRoutes = require('./routes/publicRoutes')

var app = express()
// habilita cors domain https://github.com/expressjs/cors
app.use(cors())
app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes)
app.use('/public', publicRoutes)

module.exports = app
