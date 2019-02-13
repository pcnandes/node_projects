const { Condominio, Bloco, Unidade, Morador, sequelize } = require('./../models')
const util = require('./util')

exports.listar = function (usuario) {
  return Unidade.findAll()
}

exports.carregar = function (id) {
  return Unidade.findByPk(id, {
    include: [{
      model: Bloco,
      as: 'bloco',
      include: [{
        model: Condominio,
        as: 'condominio'
      }]
    }, {
      model: Morador,
      as: 'moradores'
    }]
  })
}

exports.alterar = async function (unidade) {
  // return Unidade.build({ ...unidade }).save()
  let unidadeBd = await this.carregar(unidade.id)
  if (!unidadeBd) throw new Error('idUnidade nao encontrada')

  let transaction = await sequelize.transaction()
  let promises = []
  if (unidadeBd.moradores && unidade.moradores) {
    let excluidos = util.getItensExcluidos(unidadeBd.moradores, unidade.moradores)
    // adiciono as inclusoes e alteracoes
    promises.push(...unidade.moradores.filter(morador => !excluidos || excluidos.indexOf(morador.id) < 0)
      .map(morador => {
        morador.unidade_id = unidade.id
        // removo a data de criacao
        if (morador.dataCriacao) delete morador['dataCriacao']
        return Morador.upsert(morador, { transaction })
      }))
    // adiciono as exclusoes de blocos
    if (excluidos && excluidos.length > 0) {
      promises.push(Morador.destroy({ where: { id: excluidos }, transaction }))
    }
  }
  // adiciono o update do condominio
  promises.push(Unidade.update(unidade, { where: { id: unidade.id }, transaction }))
  return Promise.all(promises)
    .then(() => {
      transaction.commit()
      return this.carregar(unidade.id)
    })
    .catch(err => {
      // verifico se a transsacao ainda está ativa
      if (!transaction.finished) transaction.rollback()
      return Promise.reject(err)
    })
}
