'use strict'

const request = require('request').defaults({
  // é preciso informar o user-agent para usar a api do github
  headers: {
      'User-Agent': 'NodeBR'
  }
})

// funcao que implementa promise
function minhaPromise() {
  return new Promise((resolve, reject) => {
    request.get('https://api.github.com/users/pcnandes/repos', (err, res, body) => {
      if(err) {
        reject(err)
      } else {
        resolve(JSON.parse(body))
      }
    }) 
  })
}

minhaPromise()
  .then(repos => repos.forEach(repo => console.log(repo.name)))