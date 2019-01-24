const { Condominio, Bloco, Usuario, sequelize } = require('./../models')
const blocoPersist = require('./blocoPersist')
// const usuarioPersist = require('./usuarioPersist')
const util = require('./util')

exports.cadastrar = async function (condominio) {
  condominio = util.parseJson(condominio)
  return Condominio.create(condominio, {
    include: [{
      model: Bloco,
      as: 'blocos',
      include: ['unidades']
    }]
  })
}
exports.listar = async function (condominio) {
  return Condominio.findAll({
    include: [{
      model: Bloco,
      as: 'blocos'
    }]
  })
}

exports.carregar = async function (id) {
  return Condominio.findByPk(id, {
    include: [{
      model: Bloco,
      as: 'blocos',
      include: ['unidades']
    }]
  })
}

exports.alterar = async function (condominio, transaction) {
  if (condominio.situacao === 'RASCUNHO') {
    this.alterarCascade(condominio, transaction)
  } else {
    let _condominio = Condominio.build({ ...condominio })
    _condominio.save(transaction)
  }
}

// TODO refatorar esse bloco
exports.alterarCascade = async function (condominio, transaction) {
  // carrego o condominio do banco
  let condominioBd = await Condominio.findByPk(condominio.id, { include: ['blocos'] })
  // verifico se existe o registro no banco
  if (!condominioBd.id) {
    throw new Error()
  }

  let excluidos = util.getItensExcluidos(condominioBd.blocos, condominio.blocos)
  let executaCommit = true
  if (transaction) {
    executaCommit = false
  } else transaction = await sequelize.transaction()

  let promises = []
  // adiciono as promises para dicionar os blocos alterados
  if (condominio.blocos) {
    promises.push(...condominio.blocos.filter(bloco => !excluidos || excluidos.indexOf(bloco.id) < 0)
      .map(bloco => {
        bloco.condominio_id = condominioBd.id
        if (bloco.id) {
          return blocoPersist.alterarCascade(bloco, transaction)
        } else {
          return blocoPersist.incluir(bloco, transaction)
        }
      }))
  }
  // adiciono as exclusoes de blocos
  if (excluidos && excluidos.length > 0) {
    promises.push(blocoPersist.excluir(excluidos, transaction))
  }
  // adiciono o update do condominio
  promises.push(Condominio.update(condominio, { where: { id: condominio.id }, transaction }))

  return Promise.all(promises)
    .then(() => {
      if (executaCommit) {
        transaction.commit()
        // return condominio.id
        return this.carregar(condominio.id)
      } else return true
    })
    .catch(err => {
      transaction.rollback()
      return Promise.reject(err)
    })
}

exports.excluir = function (id) {
  return Condominio.destroy({
    where: { id }
  })
}

exports.gerarContasUsuario = async function (condominio) {
  let transaction = await sequelize.transaction()
  // carrego o condominio
  let condominioBd = await Condominio.findByPk(condominio.id, { include: [{
    model: Bloco,
    as: 'blocos',
    include: ['unidades']
  }] })
  return new Promise(async (resolve, reject) => {
    try {
      condominio.situacao = 'ATIVO'
      await this.alterar(condominio, transaction)
      let promises = []
      // promises.push(condominioBd.save({ condominio }))
      condominioBd.blocos.forEach(bloco => {
        bloco.unidades.forEach(und => {
          let usuario = Usuario.build({ login: und.nome, senha: und.nome })
          // adiciono a associoacao do usuario com a unidade em uma promise
          promises.push(und.setUsuario(usuario, { transaction }))
        })
      })
      // resolvo a promise da associoação e resolvo minha promese principal
      Promise.all(promises).then(() => resolve())
    } catch (error) {
      reject(new Error('Erro ao gerar usuários'))
    }
  }).then(() => {
    transaction.commit()
    return this.carregar(condominio.id)
  }).catch(err => {
    transaction.rollback()
    return Promise.reject(err)
  })
}
