const { expect, initdb, db } = require('./config/helpers')
const persist = require('./../../server/persist/moradorPersist')
const { Morador, Unidade } = db

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
  Morador.destroy({
    where: {}
  })
    // no retorno da deleção crio um condominio
    .then(async () => {
      await Unidade.create({ nome: 'unidade teste', andar: 1 })
      let unidade = await carregarUnidade()
      novoMorador.unidade_id = unidade.id
      console.log('moradoooooor', novoMorador)
      return Morador.create(novoMorador)
    }).then(() => done())
})

it('Cadastra um morador', async () => {
  let unidade = await carregarUnidade()
  let moradores = [{ nome: 'Morador A', tipo: 'MORADOR', unidade_id: unidade.id }, { nome: 'Locatário A', tipo: 'LOCATARIO', unidade_id: unidade.id }]

  return persist.altIncDelList(moradores, unidade.id).then(data => {
    expect(data).to.have.lengthOf(2)
    expect(data.some(i => i.unidade_id !== unidade.id)).to.equal(false)
  })
})

function carregarUnidade () {
  return Unidade.findOne()
}
