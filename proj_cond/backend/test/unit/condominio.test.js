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
      nome: 'bolco2'
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
    condominio.blocos.push({ nome: 'Bloco Adicionado' })

    let condominioBd = await Condominio.findByPk(condominio.id,
      { include: [{
        association: Condominio.Bloco,
        include: [{ association: Bloco.Unidade }]
      }]
      })
    // da problema com os filhos
    // Object.assign(condominioBd, condominio)
    // altero no nome do condominio
    condominioBd.nome = condominio.nome

    // let novos = condominio.blocos.filter(alteados => condominioBd.blocos.find(original => original.id === alteados.id) === undefined)

    let blocos = []
    // PRECISO IDENTIFICAR OS NOVOS E OS ALTERADOS, PARA OS NOVOS PRECISO
    /* condominio.blocos.forEach(_bloco => {
      _bloco = Bloco.build({ ..._bloco })
      _bloco.condominio_id = condominioBd.id
      blocos.push(_bloco)
    }) */

    // altero no nome de um bloco
    condominioBd.blocos[0].nome = condominio.blocos[0].nome
    // condominioBd.setBlocos(blocos)

    condominioBd.blocos.push(Bloco.build({ nome: 'bloco novooo', condominio_id: condominioBd.id }))

    // O PROBLEMA ACONTECE PQ QUANDO EDCLUO UM BLOCO ELE TENTA SETAR NULO NO FK DO ID EXCLUIDO
    // ISSO OCORRE QUANDO FAZ SETBLOCOS
    // remove o bloco 2
    condominioBd.blocos.splice(1, 1)
    console.log('bloccccccooooosss', condominioBd.blocos)

    sequelize.transaction(t1 => {
      return Promise.all([
        ...condominioBd.blocos.map(_bloco => {
          // console.log(_bloco)
          _bloco.save({ transaction: t1 })
        }),
        condominioBd.setBlocos(condominioBd.blocos),
        condominioBd.save({ transaction: t1 })
      ])
    })
  })
})

function verificaAteracaoBloco(blocoOriginal, blocoAlterado) {

}
