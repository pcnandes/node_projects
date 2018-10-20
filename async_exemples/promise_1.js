'use strict'
// promise hierarquico 


function elevaNumero(numero) {
  return new Promise(function (resolve, reject) {
    if(isNaN(numero)) {
      reject('Deu um erro aqui...')
    } else {
      resolve(Math.pow(numero, 2))
    }
  })
}

function geraNumero() {
  return new Promise(function (resolve, reject) {
    //elevaNumero(100)
    //  .then(function(res){console.log(res)})
    elevaNumero(100)
      .then(function (res) {
        resolve(
          {'texto': 'teste', 
          'valor': res}
          )
      })
      .catch(function(err){
        reject(err)
      })
    })
}

geraNumero()
  .then(function (res) {
    console.log(res.texto+':', res.valor)
  })
  .catch(function (err) {
    console.log('Erro: ', err)
  })