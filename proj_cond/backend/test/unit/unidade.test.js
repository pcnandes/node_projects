const { expect, initdb, db } = require('./config/helpers')
const persist = require('./../../server/persist/unidadePersist')
const { Unidade } = db

const novaUnidade = { nome: 'unidade teste', andar: 1 }

const novoMorador = {
  nome: 'Morador test',
  tipo: 'MORADOR'
}

const novoVeiculo = {
  tipo: 'CARRO',
  marca: 'Ford TEST',
  modelo: 'Fista TEST',
  cor: 'VERMELHO',
  placa: 'LLL-0000'
}

const novocolaborador = {
  nome: 'Colaborador test',
  tipoDoc: 'RG',
  numeroDoc: '1234'
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
        unidade.veiculos = new Array(novoVeiculo)
        unidade.colaboradores = new Array(novocolaborador)
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

  // testa morador
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

  // testa veiculo
  it('Cadastra um veiculo', async () => {
    let unidade = await carregarUnidade()
    unidade = JSON.parse(JSON.stringify(unidade))
    let veiculo = novoVeiculo
    veiculo.modelo = 'Fusca'
    unidade.veiculos.push(veiculo)
    return persist.alterar(unidade).then(data => {
      expect(data.veiculos).to.have.lengthOf(2)
      expect(data.veiculos.some(i => i.unidade_id !== unidade.id)).to.equal(false)
      expect(data.veiculos.some(i => i.model !== veiculo.modelo)).to.equal(true)
    })
  })

  it('Alterar um veiculo', async () => {
    let unidade = await carregarUnidade()
    unidade = JSON.parse(JSON.stringify(unidade))
    unidade.veiculos[0].modelo = 'alterado'
    return persist.alterar(unidade).then(data => {
      expect(data.veiculos).to.have.lengthOf(1)
      expect(data.veiculos[0].modelo).to.deep.equal('alterado')
    })
  })

  it('Excluir um veiculo', async () => {
    let unidade = await carregarUnidade()
    unidade = JSON.parse(JSON.stringify(unidade))
    // cadastro dois moradores
    let veiculos = [
      { tipo: 'CARRO', marca: 'Volkswagen', modelo: 'Fusca', cor: 'BRANCO', placa: 'iii-9999' },
      { tipo: 'MOTO', marca: 'HONDA', modelo: 'CB500', cor: 'PRETO', placa: 'KKK-1111' }
    ]
    unidade.veiculos = veiculos
    let unidadeAlt = await persist.alterar(unidade)
    unidadeAlt = JSON.parse(JSON.stringify(unidadeAlt))
    // apos salvar no banco, excluo o ultimo veiculo
    let tamanho = unidadeAlt.veiculos.length
    let excluido = unidadeAlt.veiculos[tamanho - 1]
    unidadeAlt.veiculos = unidadeAlt.veiculos.splice(tamanho - 2, tamanho - 1)
    return persist.alterar(unidadeAlt).then(data => {
      // verifico se o morador foi excluido
      expect(data.veiculos).to.have.lengthOf(tamanho - 1)
      expect(data.veiculos.some(i => i.id === excluido.id)).to.equal(false)
    })
  })

  // testa colaborador
  it('Cadastra um colaborador', async () => {
    let unidade = await carregarUnidade()
    unidade = JSON.parse(JSON.stringify(unidade))
    let colaborador = novocolaborador
    colaborador.nome = 'Teste'
    unidade.colaboradores.push(colaborador)
    return persist.alterar(unidade).then(data => {
      expect(data.colaboradores).to.have.lengthOf(2)
      expect(data.colaboradores.some(i => i.unidade_id !== unidade.id)).to.equal(false)
      expect(data.colaboradores.some(i => i.model !== colaborador.nome)).to.equal(true)
    })
  })

  it('Alterar um colaborador', async () => {
    let unidade = await carregarUnidade()
    unidade = JSON.parse(JSON.stringify(unidade))
    unidade.colaboradores[0].nome = 'alterado'
    return persist.alterar(unidade).then(data => {
      expect(data.colaboradores).to.have.lengthOf(1)
      expect(data.colaboradores[0].nome).to.deep.equal('alterado')
    })
  })

  it('Excluir um colaborador', async () => {
    let unidade = await carregarUnidade()
    unidade = JSON.parse(JSON.stringify(unidade))
    // cadastro dois moradores
    let colaboradores = [
      { nome: 'Colaborador test 1', tipoDoc: 'RG', numeroDoc: '1111' },
      { nome: 'Colaborador test 2', tipoDoc: 'CPF', numeroDoc: '5555' }
    ]
    unidade.colaboradores = colaboradores
    let unidadeAlt = await persist.alterar(unidade)
    unidadeAlt = JSON.parse(JSON.stringify(unidadeAlt))
    // apos salvar no banco, excluo o ultimo veiculo
    let tamanho = unidadeAlt.veiculos.length
    let excluido = unidadeAlt.colaboradores[tamanho - 1]
    unidadeAlt.colaboradores = unidadeAlt.colaboradores.splice(tamanho - 2, tamanho - 1)
    return persist.alterar(unidadeAlt).then(data => {
      // verifico se o morador foi excluido
      expect(data.colaboradores).to.have.lengthOf(tamanho - 1)
      expect(data.colaboradores.some(i => i.id === excluido.id)).to.equal(false)
    })
  })
})

function carregarUnidade () {
  return Unidade.findOne({ include: ['moradores', 'veiculos', 'colaboradores'] })
}
