'use strict'

// funcao que implementa promise
function minhaPromise (text) {
  return new Promise((resolve, reject) => {
    //aqui eu posso fazer o processamento necessario 
    // e ao final eu resolvo minha promese, ou rejeito em caso de erro

    if(text === 'user-agent') {
      reject(new Error(403))
    } else {
      resolve(text)
    }
  }) 
}

// posso fazer separadamente..
// p1 recebe minha promese
const p1 = minhaPromise('Olaaaa')
const p2 = p1.then(result => console.log('P1 finalizada', result))
const p3 = p2.then(() => minhaPromise('Promese INCEPTION').then(r => console.log(r)))
p3.then(() => console.log('Todas as minhas promises acabaram'))

// ou posso fazer encadeado
minhaPromise('Olaaa ENCADEADO')
  .then(result2 => console.log('P1 finalizada', result2))
  // aqui será gerado um erro
  .then(() => minhaPromise('user-agent'))
  // os thens seguintes nao serãp executados até que um cath seja encontrado
  .then(() => console.log('ESSA NAO VAI IMPRIMIR PQ A ANTERIOR TEM ERRO'))
  .catch(err => console.log('Opsss', err.message))
  // depois os thens voltam a ser chamados
  .then(() => console.log('aqui volta funcionar'))
