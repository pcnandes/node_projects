const HTTPStatus = require('http-status')
const { app, request, expect, initdb } = require('./config/helpers')
const { Usuario } = require('./../../server/models')

describe('Testes de Integração condominio', () => {
  let token = null

  before((done) => {
    initdb().then(() => {
      Usuario.create({ login: 'paulo', senha: '123', perfil: 'ADMIN' }).then((u) => {
        console.log('usuarioooo', JSON.parse(JSON.stringify(u)))
        request(app)
          .post('/api/public/login')
          .send(JSON.parse(JSON.stringify(u)))
          .end((error, res) => {
            token = res.body.token
            done(error)
          })
      })
    })
  })

  describe('GET /api/condominio', () => {
    it('Deve retornar um Json com todos os Usuários', done => {
      // vai subir nossa aplicação para eresponder as requisicoes
      request(app)
        .get('/api/condominio')
        .set({ 'Authorization': token, Accept: 'application/json' })
        .end((error, res) => {
          expect(res.status).to.equal(HTTPStatus.OK)
          expect(res.body).to.be.an('array')
          done(error)
        })
    })
  })
})
