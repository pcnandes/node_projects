const { Bloco, Unidade } = require('./../config/sequelize')
const { sequelize } = require('./../config/sequelize.test.js')
const util = require('./util')

exports.alterarCascade = async function (bloco, transaction) {
  // carrego o condominio do banco
  let blocoBd = await Bloco.findByPk(bloco.id,
    { include: [{
      association: Bloco.Unidade
    }]
    })

  // verifico se existe o registro no banco
  if (!blocoBd.id) {
    throw new Error()
  }

  let excluidos = util.getItensExcluidos(blocoBd.unidades, bloco.unidades)

  transaction = !transaction ? await sequelize.transaction() : transaction

  if (bloco.unidades) {
    let resultado
    Promise.all([
      ...bloco.unidades.filter(unidade => {
        // se nao estiver na lista de excluidos eu chamo o upsert
        if (!excluidos || excluidos.indexOf(unidade.id) < 0) {
          unidade.bloco_id = blocoBd.id
          Unidade.upsert(unidade, { transaction })
        }
      }),
      // todo verificar delete cascade
      Unidade.destroy({ where: { id: excluidos } }),
      Bloco.update(bloco, { where: { id: bloco.id }, transaction })
    ]).then(resultados => {
      console.log(resultados)
      return Promise.resolve()
    }).catch(err => {
      console.log('entrou no catch', resultado)
      return Promise.reject(err)
    })
  } else {
    return Bloco.update(bloco, { where: { id: bloco.id }, transaction })
  }
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
