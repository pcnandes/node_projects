const { Bloco, Unidade } = require('./../config/sequelize')
const { sequelize } = require('./../config/sequelize.test.js')
const util = require('./util')

exports.alterarCascade = async function (bloco, transaction) {
  // carrego o condominio do banco
  let blocoBd = await Bloco.findByPk(bloco.id, {
    include: [{
      association: Bloco.Unidade
    }]
  })

  // verifico se existe o registro no banco
  if (!blocoBd.id) {
    throw new Error()
  }
  let excluidos = util.getItensExcluidos(blocoBd.unidades, bloco.unidades)
  transaction = !transaction ? await sequelize.transaction() : transaction

  let promises = []
  if (bloco.unidades) {
    // adiciono as promises para dicionar as unidades alteradas
    promises.push(...bloco.unidades.filter(unidade => !excluidos || excluidos.indexOf(unidade.id) < 0)
      .map(unidade => {
        unidade.bloco_id = blocoBd.id
        return Unidade.upsert(unidade, { transaction })
      }))
  }

  // adiciono as exclusoes de blocos
  if (excluidos && excluidos.lenght > 0) {
    Unidade.destroy({ where: { id: excluidos }, transaction })
  }
  // adiciono o update do condominio
  promises.push(Bloco.update(bloco, { where: { id: bloco.id }, transaction }))

  return Promise.all(promises)
    .then(() => {
      return bloco.id
    })
    .catch(err => {
      // verifico se a transsacao ainda está ativa
      if (!transaction.finished) transaction.rollback()
      return Promise.reject(err)
    })
}

exports.incluir = function (bloco, transaction) {
  return Bloco.create(bloco,
    { include: [{ association: Bloco.Unidade }],
      transaction: transaction
    })
}

exports.excluir = function (excluidos, transaction) {
  return Bloco.destroy({ where: { id: excluidos }, transaction })
}
