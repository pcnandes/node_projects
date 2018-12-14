const { Condominio, Bloco } = require('./../config/sequelize')
const { sequelize } = require('./../config/sequelize.test.js')

exports.alterar = async function (condominio) {
  // carrego o condominio do banco
  let condominiBD = await Condominio.findOne(
    { where: { id: condominio.id },
      include: [{
        association: Condominio.Bloco,
        include: [{ association: Bloco.Unidade }]
      }]
    })
  // verifico se existe o registro no banco
  if (!condominiBD.id) {
    throw new Error()
  }
  let incAltDel = getAlteracoes(condominiBD.blocos, condominio.blocos)

  // garanto que veio um json PRECISO DISSO?
  condominio = JSON.parse(JSON.stringify(condominio))

  // inicio da tranzação
  return sequelize.transaction(t1 => {
    // atualizo todos os blocos
    return Promise.all([
      ...incAltDel.novos.map(async blocoInc => {
        // await condominiBD.create(Bloco, bloco, { transaction: t1 })
        blocoInc.condominio_id = condominio.id
        await Bloco.create(blocoInc, { transaction: t1 })
        return 'I'
      }),
      ...incAltDel.alterados.map(async blocoAlt => {
        const bloco = condominio.blocos.find(_bloco => _bloco.id === blocoAlt.id)
        Object.assign(blocoAlt, bloco)
        await blocoAlt.save({ transaction: t1 })
        return 'A'
      }),
      ...incAltDel.excluidos.map(async blocoDel => {
        await blocoDel.destroy({ transaction: t1 })
        return 'E'
      }),
      Condominio.update(condominio, { where: { id: condominio.id }, transaction: t1 }).then(x => { return 'U' })
    ])
  })
}

function getAlteracoes (source, updated) {
  let novos = updated.filter(updatedItem => source.find(sourceItem => sourceItem.id === updatedItem.id) === undefined)
  let alterados = source.filter(sourceItem => updated.find(updatedItem => updatedItem.id === sourceItem.id) !== undefined)
  let excluidos = source.filter(sourceItem => updated.find(updatedItem => updatedItem.id === sourceItem.id) === undefined)

  const alteracoes = {
    novos: novos,
    alterados: alterados,
    excluidos: excluidos
  }

  return alteracoes
}
