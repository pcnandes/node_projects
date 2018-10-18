'use strict'

const request = require('request-promise')
  .defaults({
    headers: {'User-Agent': 'Bitbucket'},
    json: true
  })


function getRepos(user) {
  return request(`https://api.github.com/users/${user}/repos`)
}


/* jshint ignore:start */
async function teste () {
  // como Promise.all retorna uma promise, posso usar o await nele, dessa forma 
  // a funcao vai aguardar o retorno de todas as promises
  // const repos =
  // nesse exemplo sei q meu retorno é um array de duas posições, dessa forma, 
  // posso ja retornar para dois objetos
  const [alan, paulo] = await Promise.all([
    getRepos('alanhoff')
      .then(repos => repos.slice(0, 2)),
    getRepos('pcnandes')
  ])

  console.log(alan.length)
  console.log(paulo.length)
}

async function test2() {
  // outra maneira de usar await NÂO RECOMENDADO
  if(await getRepos('alanhoff').then(repos => repos.length)>9){
    console.log('Tem mais de 9 repositórios')
  }
}

// nesse exemplo eu posso criar um array de promises e depois usar o await para setar o retorno
// nesse exemplo ele vai aguardar a execucao das promises para depois dar sequencia
async function test3() {
  const jobs = []
  ;['alanhoff', 'pcnandes'].forEach(user => {
    jobs.push(getRepos(user))
  })

  // o await deve sempre preceder uma promise
  const result = await Promise.all(jobs)

  console.log(result[0].length)
  console.log(result[1].length)
}

teste()
  .then(() => console.log('Terminou teste '))
  .catch(err => console.error(err))

test2()
  .then(() => console.log('Terminou Teste 2'))
  .catch(err => console.error(err))

test3()
  .then(() => console.log('Terminou Teste 3'))
  .catch(err => console.error(err))
/* jshint ignore:end */