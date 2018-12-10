const { expect } = require('./config/helpers')
// import { Condominio, Bloco } from '../../config/sequelize.js'
const { initdb } = require('../../config/sequelize.test.js')
const { Condominio, Bloco } = require('../../config/sequelize.js')

const novoCondominio = {
  nome: 'condominio test',
  blocos: [
    {
      nome: 'bolco1',
      unidades: [{
        nome: '101',
        andar: 1
      },
      {
        nome: '102',
        andar: 1
      },
      {
        nome: '201',
        andar: 2
      },
      {
        nome: '202',
        andar: 2
      }]
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
})
