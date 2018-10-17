'use strict'
// request pega o conteudo de uma pagina web
const request = require('request').defaults({
    // é preciso informar o user-agent para usar a api do github
    headers: {
        Accept: '*/*',
        'User-Agent': 'LIBERA AI'
    }
})

// outro exemplo de como usar o callback
request.get('https://api.github.com/users/pcnandes/repos', (err, res, body) => {
    console.log('CALBACK')
    if(err) {
        throw err
    }
    const resp = JSON.parse(body)
    resp.forEach(repo => console.log(repo.name))
})


// Exemplo de callback HELL ( ou seja, calbacks encadeados)
request.get('https://api.github.com/users/pcnandes/repos', (err, res, body) => {
    console.log('CALBACK HELL')
    if(err) {
        throw err
    }
    const resp = JSON.parse(body)
    //console.log(resp)
    // let requests = repos.length
    
    resp.forEach( repo => {
        console.log('Acessando url', `https://api.github.com/users/pcnandes/repos/${repo.id}`)
        request.get(`https://api.github.com/users/pcnandes/repos/${repo.id}`, (err, res, body) => {
            if(err) {
                throw err
            }
            console.log(JSON.parse(body))
        })
            
    })
})