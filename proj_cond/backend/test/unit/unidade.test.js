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

describe('Teste Unitario do UnidadePersist', () => {
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

  it('Alterar uma unidade', async () => {
    let unidade = await carregarUnidade()
    unidade = JSON.parse(JSON.stringify(unidade))
    unidade.nome = 'nome alterado'
    return persist.alterar(unidade).then(data => {
      expect(data.nome).to.deep.equal('nome alterado')
    })
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
    unidade.moradores[0].nome = 'nome alterado'
    return persist.alterar(unidade).then(data => {
      expect(data.moradores).to.have.lengthOf(1)
      expect(data.moradores[0].nome).to.deep.equal('nome alterado')
    })
  })

  it('Excluir um morador', async () => {
    let unidade = await carregarUnidade()
    unidade = JSON.parse(JSON.stringify(unidade))
    // cadastro dois moradores
    let moradores = [{ nome: 'Morador A', tipo: 'MORADOR', unidade_id: unidade.id }, { nome: 'Locatário A', tipo: 'LOCATARIO', unidade_id: unidade.id }]
    unidade.moradores = moradores
    let unidadeAlt = await persist.alterar(unidade)
    unidadeAlt = JSON.parse(JSON.stringify(unidadeAlt))
    // apos salvar no banco, excluo o ultimo morador
    let tamanho = unidadeAlt.moradores.length
    let moradorExcluido = unidadeAlt.moradores[tamanho - 1]
    unidadeAlt.moradores = unidadeAlt.moradores.splice(tamanho - 2, tamanho - 1)
    return persist.alterar(unidadeAlt).then(data => {
      // verifico se o morador foi excluido
      expect(data.moradores).to.have.lengthOf(tamanho - 1)
      expect(data.moradores.some(i => i.id === moradorExcluido.id)).to.equal(false)
    })
  })
})

function carregarUnidade () {
  return Unidade.findOne({ include: ['moradores'] })
}
