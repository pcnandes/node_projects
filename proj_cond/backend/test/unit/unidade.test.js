const { expect, initdb, db } = require('./config/helpers')
const persist = require('./../../server/persist/unidadePersist')
const { Unidade } = db

const novaUnidade = { nome: 'unidade teste', andar: 1 }

const novoMorador = {
  nome: 'Morador test',
  tipo: 'MORADOR',
  dataCriacao: new Date()
}
// gambiarra para iniciar o banco antes de iniciar os testes
before((done) => {
  initdb().then(() => {
    console.log(`---base de dados e tabelas criados!`)
    done()
  })
})

// executa antes de cada caso de testes
beforeEach((done) => {
  Unidade.destroy({
    where: {}
  })
    // no retorno da deleção crio um condominio
    .then(async () => {
      let unidade = await Unidade.create(novaUnidade)
      unidade = JSON.parse(JSON.stringify(unidade))
      unidade.moradores = new Array(novoMorador)
      return persist.alterar(unidade)
    }).then(() => done())
})

it('Cadastra um morador', async () => {
  let unidade = await carregarUnidade()
  unidade = JSON.parse(JSON.stringify(unidade))
  let moradores = [{ nome: 'Morador A', tipo: 'MORADOR', unidade_id: unidade.id }, { nome: 'Locatário A', tipo: 'LOCATARIO', unidade_id: unidade.id }]
  unidade.moradores = moradores
  return persist.alterar(unidade).then(data => {
    expect(data.moradores).to.have.lengthOf(2)
    expect(data.moradores.some(i => i.unidade_id !== unidade.id)).to.equal(false)
  })
}) 

it('Alterar um morador', async () => {
  let unidade = await carregarUnidade()
  unidade = JSON.parse(JSON.stringify(unidade))
  console.log('unidadeeee', unidade)
  unidade.moradores[0].nome = 'nome alterado'
  return persist.alterar(unidade).then(data => {
    expect(data.moradores).to.have.lengthOf(1)
    expect(data.moradores[0].nome).to.deep.equal('nome alterado')
  })
})

function carregarUnidade () {
  return Unidade.findOne({ include: ['moradores'] })
}
