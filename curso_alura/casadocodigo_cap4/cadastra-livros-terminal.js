var http = require('http');

// esse arquivo usa o app.js, para que funcione, é preciso que o app.js esteja rodando
// ele cadastra um livro passando um objeto json como parametro

var configuracoes = {
    hostname: 'localhost',
    port: 3000,
    path: '/produtos',
    method: 'post',
    headers: {
        // define que reebe um json
        'Accept': 'application/json',
        // define que esta passando um json
        'Content-type':'application/json'
    }
};

// monta uma requisição padrao
var client = http.request(configuracoes, function(res) {
    console.log(res.statusCode);
    res.on('data', function(body) {
        console.log('Corpo: ' + body);
    });
});

//json a ser passado
var produto = {
    titulo: 'mais sobre node',
    descricao: 'node, javascript e um pouco sobre http',
    preco: '100'
}

// envia a requisicao com o parameto
client.end(JSON.stringify(produto));
