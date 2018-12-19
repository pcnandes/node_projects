const { Condominio, Bloco } = require('./../config/sequelize')
const { sequelize } = require('./../config/sequelize.test.js')
const blocoPersist = require('./blocoPersist')
const util = require('./util')

exports.cadastrar = async function (condominio) {
  condominio = util.parseJson(condominio)
  return Condominio.create(condominio, {
    include: [{
      association: Condominio.Bloco,
      include: [{ association: Bloco.Unidade }]
    }]
  })
}
exports.listar = async function (condominio) {
  return Condominio.findAll({
    include: [{
      association: Condominio.Bloco,
      include: [{ association: Bloco.Unidade }]
    }]
  })
}

exports.carregar = async function (id) {
  return Condominio.findByPk(id, {
    include: { model: Bloco, include: ['unidades'] }
  })
}

exports.alterar = async function (condominio, transaction) {
  // carrego o condominio do banco
  let condominioBd = await Condominio.findByPk(condominio.id, {
    include: [{
      association: Condominio.Bloco
    }]
  })
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
  if (excluidos && excluidos.lenght > 0) {
    promises.push(blocoPersist.excluir(excluidos, transaction))
  }
  // adiciono o update do condominio
  promises.push(Condominio.update(condominio, { where: { id: condominio.id }, transaction }))

  return Promise.all(promises)
    .then(() => {
      transaction.commit()
      return condominio.id
    })
    .catch(err => {
      transaction.rollback()
      return Promise.reject(err)
    })
}
