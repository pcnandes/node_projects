const { expect, initdb, db } = require('./config/helpers')
const persist = require('./../../server/persist/unidadePersist')
const { Morador, Unidade } = db

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
  Morador.destroy({
    where: {}
  })
    // no retorno da deleção crio um condominio
    .then(async () => {
      let unidade = await Unidade.create(novaUnidade)
      // let unidade = await carregarUnidade()
      // novoMorador.unidade_id = unidade.id
      unidade = JSON.parse(JSON.stringify(unidade))
      console.log('unidadeeeee', unidade)
      unidade.moradores = [novoMorador]
      // return Morador.create(novoMorador)
      return persist.alterar(unidade)
    }).then(() => done())
})

it('Cadastra um morador', async () => {
  let unidade = await carregarUnidade()
  unidade = JSON.parse(JSON.stringify(unidade))
  let moradores = [{ nome: 'Morador A', tipo: 'MORADOR', unidade_id: unidade.id }, { nome: 'Locatário A', tipo: 'LOCATARIO', unidade_id: unidade.id }]
  unidade.moradores = moradores
  return persist.alterar(unidade).then(data => {
    console.log('aquiiiiiiiii', data)
  })
})

function carregarUnidade () {
  return Unidade.findOne()
}
