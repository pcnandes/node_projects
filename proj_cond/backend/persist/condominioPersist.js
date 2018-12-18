const { Condominio } = require('./../config/sequelize')
const { sequelize } = require('./../config/sequelize.test.js')
const blocoPersist = require('./blocoPersist')
const util = require('./util')

exports.alterar = async function (condominio) {
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

  const transaction = await sequelize.transaction()

  return Promise.all([
    ...condominio.blocos.filter(bloco => !excluidos || excluidos.indexOf(bloco.id) < 0)
      .map(bloco => {
        bloco.condominio_id = condominioBd.id
        if (bloco.id) {
          return blocoPersist.alterarCascade(bloco, transaction)
        } else {
          return blocoPersist.incluir(bloco, transaction)
        }
      }),
    // todo verificar delete cascade
    blocoPersist.excluir(excluidos),
    Condominio.update(condominio, { where: { id: condominio.id }, transaction })
  ])
    .then(() => condominio.id)
    .catch(err => {
      if (!transaction.finished) transaction.rollback()
      return Promise.reject(err)
    })
}
