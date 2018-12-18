const { Condominio } = require('./../config/sequelize')
const { sequelize } = require('./../config/sequelize.test.js')
const blocoPersist = require('./blocoPersist')
const util = require('./util')

exports.alterar = async function (condominio) {
  // carrego o condominio do banco
  let condominioBd = await Condominio.findByPk(condominio.id,
    { include: [{
      association: Condominio.Bloco
    }]
    })
  // verifico se existe o registro no banco
  if (!condominioBd.id) {
    throw new Error()
  }
  console.log('util', util)
  let excluidos = util.getItensExcluidos(condominioBd.blocos, condominio.blocos)

  const t1 = await sequelize.transaction()

  // let resultT = await sequelize.transaction(t1 => {
  Promise.all([
    ...condominio.blocos.filter(bloco => !excluidos || excluidos.indexOf(bloco.id) < 0)
      .map(bloco => {
        bloco.condominio_id = condominioBd.id
        if (bloco.id) {
          return blocoPersist.alterarCascade(bloco, t1)
        } else {
          return blocoPersist.incluir(bloco, t1)
        }
      }),
    // todo verificar delete cascade
    blocoPersist.excluir(excluidos),
    Condominio.update(condominio, { where: { id: condominio.id }, transaction: t1 })
  ]).then(resultados => {
    console.log('resultadosssssss')
    return Promise.resolve()
  }).catch(err => {
    t1.rollback()
    console.log('entrou no catch', err)
    return Promise.reject(err)
  })
}

/*
function getAlteracoes (banco, alterados) {
  let incAlt
  let excluidos
  if (!!banco && !!alterados) {
    incAlt = alterados.filter(itemAlt => (banco.find(itemBd => itemAlt.id === undefined || itemAlt.id === itemBd.id)))
    excluidos = banco.filter(itemBd => alterados.find(itemAlt => itemAlt.id === itemBd.id) === undefined)
    if (excluidos) {
      excluidos = excluidos.map(item => item.id)
    }
  }
  const alteracoes = {
    incAlt: incAlt,
    excluidos: excluidos
  }
  return alteracoes
}
*/
