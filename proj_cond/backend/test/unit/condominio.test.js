const { expect } = require('./config/helpers')
const { initdb } = require('../../config/sequelize.test.js')
const { Condominio, Bloco } = require('../../config/sequelize.js')
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

  it('Altera condominio altera bloco', async () => {
    let condominio = await Condominio.findOne(
      { limit: 1,
        include: [{
          association: Condominio.Bloco,
          include: [{ association: Bloco.Unidade }]
        }]
      })
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // altero o bloco1
    condominio.blocos[0].nome = 'Bloco alteraddooooooo'
    let idAlterado = await persist.alterar(condominio)
    return persist.carregar(idAlterado).then(data => {
      expect(data.blocos).to.have.lengthOf(condominio.blocos.length)
      expect(data.blocos.map(i => i.nome)).to.deep.include('Bloco alteraddooooooo')
    })
  })

  it('Altera condominio exclui bloco', async () => {
    let condominio = await Condominio.findOne(
      { limit: 1,
        include: [{
          association: Condominio.Bloco,
          include: [{ association: Bloco.Unidade }]
        }]
      })
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // excluo um bloco
    let qtdBlocos = condominio.blocos.length
    condominio.blocos.splice(1, 1)
    let idAlterado = await persist.alterar(condominio)
    return persist.carregar(idAlterado).then(data => {
      expect(data.blocos).to.have.lengthOf(qtdBlocos - 1)
    })
  })

  it('Altera condominio altera unidade', async () => {
    let condominio = await Condominio.findOne(
      { limit: 1,
        include: [{
          association: Condominio.Bloco,
          include: [{ association: Bloco.Unidade }]
        }]
      })
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // altero o nome de uma unidade
    condominio.blocos[0].unidades[0].nome = 'testeee'
    let idAlterado = await persist.alterar(condominio)
    return persist.carregar(idAlterado).then(data => {
      expect(data.blocos[0].unidades.map(i => i.nome)).to.deep.include('testeee')
    })
  })

  it('Altera condominio adiciono unidade', async () => {
    let condominio = await Condominio.findOne(
      { limit: 1,
        include: [{
          association: Condominio.Bloco,
          include: [{ association: Bloco.Unidade }]
        }]
      })
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // adiciono uma unidade
    condominio.blocos[0].unidades.push({ nome: 'Unidade Adicionado' })
    const qtdUnidades = condominio.blocos[0].unidades.length
    let idAlterado = await persist.alterar(condominio)
    return persist.carregar(idAlterado).then(data => {
      expect(data.blocos[0].unidades).to.have.lengthOf(qtdUnidades)
      expect(data.blocos[0].unidades.map(i => i.nome)).to.deep.include('Unidade Adicionado')
    })
  })

  it('Altera condominio exclui unidade', async () => {
    let condominio = await Condominio.findOne(
      { limit: 1,
        include: [{
          association: Condominio.Bloco,
          include: [{ association: Bloco.Unidade }]
        }]
      })
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // excluo uma unidade
    let qtdUnidades = condominio.blocos[0].unidades.length
    condominio.blocos[0].unidades.splice(1, 1)
    let idAlterado = await persist.alterar(condominio)
    return persist.carregar(idAlterado).then(data => {
      expect(data.blocos[0].unidades).to.have.lengthOf(qtdUnidades - 1)
    })
  })

  it('Altera condominio Teste FULL', async () => {
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
    let idAlterado = await persist.alterar(condominio)
    return persist.carregar(idAlterado).then(data => {
      expect(data.nome).to.deep.equal(condominio.nome)
      expect(data.blocos).to.have.lengthOf(condominio.blocos.length)
      expect(data.blocos.map(i => i.nome)).to.deep.include('Bloco alteraddooooooo')
      expect(data.blocos.map(i => i.nome)).to.deep.include('Bloco Adicionado')
    })
  })
})
