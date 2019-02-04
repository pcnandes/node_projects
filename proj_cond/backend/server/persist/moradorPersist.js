const { Morador, Unidade, sequelize } = require('./../models')
const unidadePersist = require('./unidadePersist')
const util = require('./util')

exports.listar = function (idUnidade) {
  return Morador.findAll({
    where: { unidade_id: idUnidade }
  })
}

exports.carregar = function (id) {
  return Morador.findByPk(id, {
    include: [{
      model: Unidade,
      as: 'unidade'
    }]
  })
}

exports.altIncDelList = async function (moradores, idUnidade, transaction) {
  let unidade = await unidadePersist.carregar(idUnidade)
  if (!unidade) throw new Error('idUnidade nao encontrada')

  // carrego os moradores da unidade
  let moradoresBd = await this.listar(idUnidade)

  let excluidos = util.getItensExcluidos(moradoresBd, moradores)
  transaction = !transaction ? await sequelize.transaction() : transaction

  let promises = []
  if (moradores) {
    // adiciono as inclusoes e alteracoes
    promises.push(...moradores.filter(morador => !excluidos || excluidos.indexOf(morador.id) < 0)
      .map(morador => {
        morador.unidade_id = idUnidade
        return Morador.upsert(morador, { transaction })
      }))
  }
  // adiciono as exclusoes de blocos
  if (excluidos && excluidos.length > 0) {
    Morador.destroy({ where: { id: excluidos }, transaction })
  }
  // adiciono o update do condominio

  return Promise.all(promises)
    .then(() => {
      transaction.commit()
      return this.listar(idUnidade)
    })
    .catch(err => {
      // verifico se a transsacao ainda está ativa
      if (!transaction.finished) transaction.rollback()
      return Promise.reject(err)
    })
}
