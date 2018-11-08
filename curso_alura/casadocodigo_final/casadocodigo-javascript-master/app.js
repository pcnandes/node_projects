var app = require('./config/express')();
// para usar o socket.io é preciso usar o server http do node
var http = require('http').Server(app);
var io = require('socket.io')(http);    

// seta o io como variavel podendo ser usado em toda a aplicação
// app.get('io')
app.set('io',io);	

// recupera a porta da variavel de ambiente, caso nao exista usa a 3000
// essas variaveis sao criadas no heroku
var porta = process.env.PORT || 3000;
// é preciso iniciar o server http do node
var server = http.listen(porta, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('Example app listening at http://%s:%s', host, port);

});


