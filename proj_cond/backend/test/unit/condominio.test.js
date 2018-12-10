import { expect } from './config/helpers'
const { Condominio, Bloco } = require('../../config/sequelize')

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
    return Condominio.findByPk(1, {
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
    })
  })
})
