require("dotenv-safe").load();
jwt = require('jsonwebtoken');
var express = require('express');
var cors = require('cors')
var path = require('path');
//var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRoutes = require('./routes/indexRoutes');
var publicRoutes = require('./routes/publicRoutes');

var app = express();
// habilita cors domain https://github.com/expressjs/cors
app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
//app.use(cookieParser());
//app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRoutes);
app.use('/public', publicRoutes);

module.exports = app;
