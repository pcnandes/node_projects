'use strict'

// request-promise semelhante ao request, mas ja aceita promese, o anterior trabalha com callback
const request = require('request-promise')
  .defaults({
    headers: {'User-Agent': 'Bitbucket'},
    json: true
  })

// async transforma minha funcao em uma promese
/* jshint ignore:start */
async function teste() {
  // repare que o inciando teste será chamado duas vezes,  await nao para tudo, internamente
  // ele funciona como uma promese e breca apenas oq está embaixo
  console.log('Iniciando teste')
  // await diz q vai pausar a funcao e aguardar até que venha o resultado
  const repos = await request('https://api.github.com/users/pcnandes/repos')
  console.log('numero de repos: ', repos.lenght)
}
/* jshint ignore:end */

teste().then(() => console.log('Terminou 1'))
teste().then(() => console.log('Terminou 2'))