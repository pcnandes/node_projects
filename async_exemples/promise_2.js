'use strict'
// promise hierarquico com arrow function


function elevaNumero(numero) {
  return new Promise((resolve, reject) => {
    if(isNaN(numero)) {
      reject('Não é um número')
    } else {
      resolve(Math.pow(numero, 2))
    }
  })
}

function geraNumero() {
  return new Promise((resolve, reject) => {
    elevaNumero(100)
      .then((res) => resolve({'texto': 'teste','valor': res}))
      .catch((err) => reject(err))
    })
}

geraNumero()
  .then((res) => console.log(res.texto+':', res.valor))
  .catch((err) => console.log('Erro: ', err))