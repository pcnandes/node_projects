const { Condominio, Bloco } = require('./../config/sequelize')
const { sequelize } = require('./../config/sequelize.test.js')

exports.alterar = async function (condominio) {
  // carrego o condominio do banco
  let condominioBd = await Condominio.findByPk(condominio.id,
    { include: [{
      association: Condominio.Bloco,
      include: [{ association: Bloco.Unidade }]
    }]
    })
  // verifico se existe o registro no banco
  if (!condominioBd.id) {
    throw new Error()
  }

  let excluidos = getExlusoes(condominioBd.blocos, condominio.blocos)

  let resultT = await sequelize.transaction(t1 => {
    return Promise.all([
      /*
      ...alteracoesBlocos.incAlt.map(item => {
        item.condominio_id = condominioBd.id
        Bloco.upsert(item, { transaction: t1 })
      }), */
      ...condominio.blocos.filter(bloco => {
        // se nao estiver na lista de excluidos eu chamo o upsert
        if (!excluidos || excluidos.indexOf(bloco.id) < 0) {
          bloco.condominio_id = condominioBd.id
          // FATA ATUALIZAR AS UNIDADES
          // preciso buscar o bloco do banco em condominioBD e verificar os excluidos
          // semelhante ao bloco
          blocoBD = condominioBd.blocos.filter(_blocoBD => {
            
          })

          Bloco.upsert(bloco, { transaction: t1 })
        }
      }),
      // todo verificar delete cascade
      Bloco.destroy({ where: { id: excluidos } }),
      Condominio.update(condominio, { where: { id: condominio.id }, transaction: t1 })
    ])
  })
  return resultT
}

function getExlusoes (banco, alterados) {
  let excluidos = []
  if (!!banco && !!alterados) {
    excluidos = banco.filter(itemBd => alterados.find(itemAlt => itemAlt.id === itemBd.id) === undefined)
    if (excluidos) {
      excluidos = excluidos.map(item => item.id)
    }
  }
  return excluidos
}

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
