const { Condominio, Bloco, Unidade, Morador, UnidadeVeiculo, UnidadeColaborador, sequelize } = require('./../models')
const util = require('./util')

exports.listar = function (usuario) {
  return Unidade.findAll()
}

exports.carregar = function (id) {
  return Unidade.findByPk(id, {
    include: [{
      model: Bloco, as: 'bloco', include: [{ model: Condominio, as: 'condominio' }]
    },
    { model: Morador, as: 'moradores' },
    { model: UnidadeVeiculo, as: 'veiculos' }, { model: UnidadeColaborador, as: 'colaboradores' }]
  })
}

exports.alterar = async function (unidade) {
  // return Unidade.build({ ...unidade }).save()
  let unidadeBd = await this.carregar(unidade.id)
  if (!unidadeBd) throw new Error('idUnidade nao encontrada')

  let transaction = await sequelize.transaction()
  let promises = []

  // moradores
  if (unidade.moradores) {
    unidade.moradores = unidade.moradores.map(m => {
      m.unidade_id = unidade.id
      // removo a data de criacao
      if (!m.dataCriacao) delete m['dataCriacao']
      return m
    })
    promises = promises.concat(util.gravarListaPromises({ listaBd: unidadeBd.moradores, lista: unidade.moradores, obj: Morador, transaction }))
  }

  // veiculos
  if (unidade.veiculos) {
    unidade.veiculos = unidade.veiculos.map(m => { m.unidade_id = unidade.id; return m })
    promises = promises.concat(util.gravarListaPromises({ listaBd: unidadeBd.veiculos, lista: unidade.veiculos, obj: UnidadeVeiculo, transaction }))
  }

  // colaboradores
  if (unidade.colaboradores) {
    unidade.colaboradores = unidade.colaboradores.map(m => { m.unidade_id = unidade.id; return m })
    promises = promises.concat(util.gravarListaPromises({ listaBd: unidadeBd.colaboradores, lista: unidade.colaboradores, obj: UnidadeColaborador, transaction }))
  }

  // adiciono o update da unidade
  promises.push(Unidade.update(unidade, { where: { id: unidade.id }, transaction }))

  return Promise.all(promises)
    .then(async () => {
      await transaction.commit()
      return this.carregar(unidade.id)
    })
    .catch(err => {
      // verifico se a transsacao ainda está ativa
      if (!transaction.finished) transaction.rollback()
      return Promise.reject(err)
    })
}
