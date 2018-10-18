'use strict'

const request = require('request').defaults({
  // é preciso informar o user-agent para usar a api do github
  headers: {
      'User-Agent': 'NodeBR'
  }
})

// funcao que implementa promise
function minhaPromise(user) {
  return new Promise((resolve, reject) => {
    request.get(`https://api.github.com/users/${user}/repos`, (err, res, body) => {
      if(err) {
        reject(err)
      } else {
        resolve(JSON.parse(body))
      }
    }) 
  })
}

// Promise.all executa varias promesses em sequencia e espera todas acabaresm
// as promeses devem ser passadas em array
Promise.all([
  minhaPromise('pcnandes'),
  minhaPromise('alanhoff')
    .then(res => res.splice(0,2))
])
  // os resultados tbm chegam por arrays
  .then(users => {
    console.log('Repos do Paulo :', users[0].length)
    console.log('Repos do Alan :', users[1].length)
  })
  .catch(err => {
    console.log('Deu erro: ', err.message)
  })
