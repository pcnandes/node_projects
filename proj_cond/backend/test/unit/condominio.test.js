const { expect, assert } = require('./config/helpers')
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
  
  it('Cadastrar condominio', async () => {
    return persist.cadastrar(novoCondominio)
      .then(data => {
        expect(data.dataValues).to.have.all.keys(
          ['id', 'nome', 'blocos']
        )
      })
  })

  it('Listar condominios', () => {
    return persist.listar().then(data => {
      expect(data).to.be.an('array')
      expect(data[0].dataValues).to.have.all.keys(
        ['id', 'nome', 'blocos']
      )
    })
  })

  it('Buscar um condominio', async () => {
    return persist.cadastrar(novoCondominio)
      .then(condInc => persist.carregar(condInc.id)
        .then(data => {
          expect(data.dataValues).to.have.all.keys(
            ['id', 'nome', 'blocos']
          )
          expect(data.blocos[0].dataValues).to.have.all.keys(
            ['condominio_id', 'id', 'nome', 'unidades']
          )
          expect(data.blocos[0].unidades[0].dataValues).to.have.all.keys(
            ['bloco_id', 'id', 'nome', 'andar']
          )
        }))
  })

  it('Altera nome do condominio', async () => {
    let condominio = await Condominio.findOne({
      include: [{
        association: Condominio.Bloco,
        include: [{ association: Bloco.Unidade }]
      }]
    })
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // altero o condominio
    condominio.nome = 'Nome Alteradooooo'
    let idAlterado = await persist.alterar(condominio)
    return persist.carregar(idAlterado).then(data => {
      expect(data.nome).to.deep.equal(condominio.nome)
    })
  })

  it('Altera condominio adiciona bloco', async () => {
    let condominio = await Condominio.findOne(
      { limit: 1,
        include: [{
          association: Condominio.Bloco,
          include: [{ association: Bloco.Unidade }]
        }]
      })
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // incluo um blobo
    const qtdBlocos = condominio.blocos.length
    condominio.blocos.push({ nome: 'Bloco Adicionado' })
    let idAlterado = await persist.alterar(condominio)
    return persist.carregar(idAlterado).then(data => {
      expect(data.blocos).to.have.lengthOf(qtdBlocos + 1)
      expect(data.blocos.map(i => i.nome)).to.deep.include('Bloco Adicionado')
    })
  })

  it('Altera condominio', async () => {
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
