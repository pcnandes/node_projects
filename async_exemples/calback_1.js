'use strict'
// setTimeout é uma funcao JS que implementa o recurso de callback
setTimeout(() => console.log('Hello word TIMER'), 1000)

// exemplo de como implementar uma funcao callback
function meuCallBack(param1, callback){
  if(param1 === 'vixi') {
    callback(new Error('Deu um erro aqui...'))
  }else{
    // o primeiro parametro retornado no calback é um erro
    callback(null, param1)
  }
}

// o primeiro parametro que a funcao deve passar para o callback é um erro que pode ocorrer
// os demais parametros 
// 'Hello word' -> parametro
// (err, resultado) -> callback
meuCallBack('Hello word', (err, resultado) => {
  if(err){
    console.log('Meu callback teve erro:', err.message)
  } else {
    console.log('acabou meu primeiro callback', resultado)
  }
})
// exemplo de callback com erro
meuCallBack('vixi', (err, resultado) => {
  if(err){
    console.log('Meu callback teve erro:', err.message)
  } else {
    console.log('acabou meu primeiro callback', resultado)
  }
})

