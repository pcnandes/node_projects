const { expect } = require('./config/helpers')
// import { Condominio, Bloco } from '../../config/sequelize.js'
const { initdb } = require('../../config/sequelize.test.js')
const { Condominio, Bloco } = require('../../config/sequelize.js')

const novoCondominio = {
  nome: 'condominio test',
  blocos: [
    {
      nome: 'bolco1',
      unidades: [{ nome: '101', andar: 1 }, { nome: '102', andar: 1 }, { nome: '201', andar: 2 }]
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
  it('deve criar um novo usuario', () => {
    return Condominio.create(novoCondominio, {
      include: [{
        association: Condominio.Bloco,
        include: [{ association: Bloco.Unidade }]
      }]
    })
      .then(data => {
        expect(data.dataValues).to.have.all.keys(
          ['id', 'nome', 'blocos']
        )
      })
  })

  it('deve listar todos os usuarios', () => {
    return Condominio.findAll().then(data => {
      expect(data).to.be.an('array')
      expect(data[0].dataValues).to.have.all.keys(
        ['id', 'nome']
      )
    })
  })

  it('deve buscar um usuario com todas as suas hierarquias', () => {
    return Condominio.create(novoCondominio, {
      include: [{
        association: Condominio.Bloco,
        include: [{ association: Bloco.Unidade }]
      }]
    }).then(condInc => Condominio.findByPk(condInc.id, {
      include: { model: Bloco, include: ['unidades'] }
    }).then(data => {
      expect(data.dataValues).to.have.all.keys(
        ['id', 'nome', 'blocos']
      )
      expect(data.dataValues.blocos[0].dataValues).to.have.all.keys(
        ['condominio_id', 'id', 'nome', 'unidades']
      )
      expect(data.dataValues.blocos[0].unidades[0].dataValues).to.have.all.keys(
        ['bloco_id', 'id', 'nome', 'andar']
      )
    }))
  })

  it('Altera nome do condominio', async () => {
    let condominio = await Condominio.findOne(
      { limit: 1,
        include: [{
          association: Condominio.Bloco,
          include: [{ association: Bloco.Unidade }]
        }]
      })
    condominio = JSON.parse(JSON.stringify(condominio))
    condominio.nome = 'Nome Alterado'
    let qtdAlterados = await Condominio.update(condominio, { where: { id: condominio.id } })
    expect(qtdAlterados[0]).to.be.equal(1)
    let condAlterado = await Condominio.findOne({ where: condominio.id })
    // console.log('retornooooo', retorno)
    expect(condAlterado.nome).to.be.equal('Nome Alterado')
  })

  it('Altera bloco do condominio', async () => {
    // nao esta atualizando o filho...
    // testar.. https://github.com/RobinBuschmann/sequelize-typescript/issues/309
    // https://stackoverflow.com/questions/33918383/sequelize-update-with-association
    // http://docs.sequelizejs.com/manual/tutorial/transactions.html
    let condominio = await Condominio.findOne(
      { limit: 1,
        include: [{
          association: Condominio.Bloco,
          include: [{ association: Bloco.Unidade }]
        }]
      })
    condominio = JSON.parse(JSON.stringify(condominio))
    condominio.blocos[0].nome = 'Nome Bloco Alterado'
    let qtdAlterados = await Condominio.update(condominio, {
      where: { id: condominio.id }
    })
    expect(qtdAlterados[0]).to.be.equal(1)
    let condAlterado = await Condominio.findOne({ where: condominio.id })
    // console.log('retornooooo', retorno)
    expect(condAlterado.blocos[0].nome).to.be.equal('Nome Bloco Alterado')
  })
})
