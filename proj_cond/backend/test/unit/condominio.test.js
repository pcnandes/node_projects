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
/*
  it('teste 2', (done) => {
    expect(200).to.equal(200)
  })
*/
})
