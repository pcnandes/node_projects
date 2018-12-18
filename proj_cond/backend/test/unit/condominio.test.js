const { expect } = require('./config/helpers')
// import { Condominio, Bloco } from '../../config/sequelize.js'
const { initdb, sequelize } = require('../../config/sequelize.test.js')
const { Condominio, Bloco, Unidade } = require('../../config/sequelize.js')
const persist = require('../../persist/condominioPersist')

const novoCondominio = {
  nome: 'condominio test',
  blocos: [
    {
      nome: 'bolco1',
      unidades: [{ nome: '101', andar: 1 }, { nome: '102', andar: 1 }, { nome: '201', andar: 2 }]
    },
    {
      nome: 'bolco2',
      unidades: [{ nome: '101', andar: 1 }]
    }
  ]
}
// gambiarra para iniciar o banco antes de iniciar os testes
before((done) => {
  initdb().then(() => {
    console.log(`base de dados e tabelas criados!`)
    done()
  })
})

// executa antes de cada caso de testes
beforeEach((done) => {
  // deleto todos os registros
  Condominio.destroy({
    where: {}
  })
    // no retorno da deleção crio um condominio
    .then(() => {
      return Condominio.create(novoCondominio, {
        // inclusao em cascata do bloco e das unidades
        include: [{
          association: Condominio.Bloco,
          include: [{ association: Bloco.Unidade }]
        }]
      })
    }).then(() => done())
})

describe('Teste Unitario do CondominioController', () => {

  it('Altera nome do condominio', async () => {
    let condominio = await Condominio.findOne(
      { limit: 1,
        include: [{
          association: Condominio.Bloco,
          include: [{ association: Bloco.Unidade }]
        }]
      })
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // altero o condominio
    condominio.nome = 'Nome Alteradooooo'
    // altero o bloco1

    condominio.blocos[0].nome = 'Bloco alteraddooooooo'
    // excluo um bloco
    condominio.blocos.splice(1, 1)
    // incluo um blobo
    condominio.blocos.push({ nome: 'Bloco Adicionado' })
    console.log(await persist.alterar(condominio))
  })

})
