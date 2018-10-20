'use strict'
// calback hierarquico 


function elevaNumero(numero, callback) {
  // por definicao, o primeiro paramtro do callback sera o erro
  if(isNaN(numero)) {
    callback(new Error('Deu um erro aqui...'))
  } else {
    callback(null, Math.pow(numero, 2))
  }
}

function geraNumero(calback) {
  // devem ser passadas a mesma quantidade de parametros que sera retornado no callback
  elevaNumero(100, function(err, numero){
    calback(err, 'seu numero gerado', numero)
  })
}

geraNumero(function(err, texto, numero) {
  if(err) {
    console.log('Deu Erro!!', err)
  } else {
    console.log(texto+':', numero)
  }
})