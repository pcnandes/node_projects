const { expect, initdb, db, persist } = require('./config/helpers')
const { Condominio, Bloco, Unidade, Usuario } = db
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
    console.log(`---base de dados e tabelas criados!`)
    done()
  })
})

// executa antes de cada caso de testes
beforeEach((done) => {
  console.log('---populando tabelas', Condominio.Bloco)
  // deleto todos os registros
  Condominio.destroy({
    where: {}
  })
    // no retorno da deleção crio um condominio
    .then(() => {
      return Condominio.create(novoCondominio, {
        // inclusao em cascata do bloco e das unidades
        include: [{
          model: Bloco,
          as: 'blocos',
          include: [{ model: Unidade, as: 'unidades' }]
        }]
      })
    }).then(() => done())
})

describe('Teste Unitario do CondominioController', () => {

  it('excluir condominio e blocos', async () => {
    let condominio = await Condominio.findOne()
    let excluido = await persist.excluir(condominio.id)
    return persist.carregar(excluido)
      .then(data => {
        expect(data).to.be.a('null')
      })
  })

  it('Cadastrar condominio', async () => {
    return persist.cadastrar(novoCondominio)
      .then(data => {
        expect(data.dataValues).to.have.all.keys(
          ['id', 'nome', 'blocos', 'situacao']
        )
      })
  })

  it('Listar condominios', () => {
    return persist.listar().then(data => {
      expect(data).to.be.an('array')
      expect(data[0].dataValues).to.have.all.keys(
        ['id', 'nome', 'blocos', 'situacao']
      )
    })
  })

  it('Buscar um condominio', async () => {
    return persist.cadastrar(novoCondominio)
      .then(condInc => persist.carregar(condInc.id)
        .then(data => {
          expect(data.dataValues).to.have.all.keys(
            ['id', 'nome', 'blocos', 'situacao']
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
    let condominio = await carregarUnidade()
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // altero o condominio
    condominio.nome = 'Nome Alteradooooo'
    return persist.alterar(condominio).then(data => {
      expect(data.nome).to.deep.equal(condominio.nome)
    })
  })

  it('Altera condominio adiciona bloco', async () => {
    let condominio = await carregarUnidade()
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // incluo um blobo
    const qtdBlocos = condominio.blocos.length
    condominio.blocos.push({ nome: 'Bloco Adicionado' })
    return persist.alterar(condominio).then(data => {
      expect(data.blocos).to.have.lengthOf(qtdBlocos + 1)
      expect(data.blocos.map(i => i.nome)).to.deep.include('Bloco Adicionado')
    })
  })

  it('Altera condominio altera bloco', async () => {
    let condominio = await carregarUnidade()
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // altero o bloco1
    condominio.blocos[0].nome = 'Bloco alteraddooooooo'
    return persist.alterar(condominio).then(data => {
      expect(data.blocos).to.have.lengthOf(condominio.blocos.length)
      expect(data.blocos.map(i => i.nome)).to.deep.include('Bloco alteraddooooooo')
    })
  })

  it('Altera condominio exclui bloco', async () => {
    let condominio = await carregarUnidade()
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // excluo um bloco
    let qtdBlocos = condominio.blocos.length
    condominio.blocos.splice(1, 1)
    return persist.alterar(condominio).then(data => {
      expect(data.blocos).to.have.lengthOf(qtdBlocos - 1)
    })
  })

  it('Altera condominio altera unidade', async () => {
    let condominio = await carregarUnidade()
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // altero o nome de uma unidade
    condominio.blocos[0].unidades[0].nome = 'testeee'
    return persist.alterar(condominio).then(data => {
      expect(data.blocos[0].unidades.map(i => i.nome)).to.deep.include('testeee')
    })
  })

  it('Altera condominio adiciono unidade', async () => {
    let condominio = await carregarUnidade()
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // adiciono uma unidade
    condominio.blocos[0].unidades.push({ nome: 'Unidade Adicionado', andar: 1 })
    const qtdUnidades = condominio.blocos[0].unidades.length
    return persist.alterar(condominio).then(data => {
      expect(data.blocos[0].unidades).to.have.lengthOf(qtdUnidades)
      expect(data.blocos[0].unidades.map(i => i.nome)).to.deep.include('Unidade Adicionado')
    })
  })

  it('Altera condominio exclui unidade', async () => {
    let condominio = await carregarUnidade()
    // transformo em um json para simular recebimento de obj
    condominio = JSON.parse(JSON.stringify(condominio))
    // excluo uma unidade
    let qtdUnidades = condominio.blocos[0].unidades.length
    condominio.blocos[0].unidades.splice(1, 1)
    return persist.alterar(condominio).then(data => {
      expect(data.blocos[0].unidades).to.have.lengthOf(qtdUnidades - 1)
    })
  })

  it('Altera condominio Teste FULL', async () => {
    let condominio = await carregarUnidade()
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
    return persist.alterar(condominio).then(data => {
      expect(data.nome).to.deep.equal(condominio.nome)
      expect(data.blocos).to.have.lengthOf(condominio.blocos.length)
      expect(data.blocos.map(i => i.nome)).to.deep.include('Bloco alteraddooooooo')
      expect(data.blocos.map(i => i.nome)).to.deep.include('Bloco Adicionado')
    })
  }) 

  it('Gerar contas de usuarios', async () => {
    let condominio = await carregarUnidade()
    return persist.gerarContasUsuario(condominio)
      .then(async data => {
        // Usuario.findByPk(data.blocos[0].unidades[0])
        let usuario = await data.blocos[0].unidades[0].getUsuario()
        expect(usuario.login).to.deep.equal(data.blocos[0].unidades[0].nome)
        expect(usuario.senha).to.deep.equal(data.blocos[0].unidades[0].nome)
        expect(data.blocos[0].unidades[0].dataValues).to.have.all.keys(
          ['bloco_id', 'id', 'nome', 'andar']
        )
      })
  })

  it('Verifica exclusao do usuario quando unidade é excluida', async () => {
    let condominio = await carregarUnidade()
    condominio = JSON.parse(JSON.stringify(condominio))
    return persist.gerarContasUsuario(condominio)
      .then(async data => {
        let usuarioExcluido = await data.blocos[1].unidades[0].getUsuario()
        data.blocos.splice(1, 1)
        data = JSON.parse(JSON.stringify(data))
        return persist.alterar(data).then(async data => {
          let usuario = await Usuario.findByPk(usuarioExcluido.id)
          expect(usuario).to.be.a('null')
        })
      })
  })

})

function carregarUnidade () {
  return Condominio.findOne({
    include: [{
      model: Bloco,
      as: 'blocos',
      include: ['unidades']
    }]
  })
}
