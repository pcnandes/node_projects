const { Condominio, Bloco, sequelize } = require('./../models')
const blocoPersist = require('./blocoPersist')
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
      as: 'blocos',
      include: ['unidades']
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
  // carrego o condominio do banco
  let condominioBd = await Condominio.findByPk(condominio.id, { include: ['blocos'] })
  // verifico se existe o registro no banco
  if (!condominioBd.id) {
    throw new Error()
  }

  let excluidos = util.getItensExcluidos(condominioBd.blocos, condominio.blocos)

  transaction = !transaction ? await sequelize.transaction() : transaction

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
      transaction.commit()
      // return condominio.id
      return this.carregar(condominio.id)
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
  condominio = util.parseJson(condominio)
  // TODO verificar inclusao em lote
  return Condominio.create(condominio, {
    include: [{
      model: Bloco,
      as: 'blocos',
      include: ['unidades']
    }]
  })
}
