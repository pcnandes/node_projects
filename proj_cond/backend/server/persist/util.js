
exports.getItensExcluidos = function (originais, alterados) {
  let excluidos = []
  if (!!originais && !!alterados) {
    // some -> retorna true se encontrou algum item
    // filter -> vai listar os itens nao encontrados
    // map -> transforma os objetos em ids
    excluidos = originais.filter(itemBd => !alterados.some(itemAlt => itemAlt.id === itemBd.id)).map(item => item.id)
  }
  return excluidos
}

exports.parseJson = function (obj) {
  return JSON.parse(JSON.stringify(obj))
}

exports.gravarListaPromises = function ({ listaBd, lista, obj, transaction }) {
  let promises = []
  if (listaBd && lista) {
    let excluidos = this.getItensExcluidos(listaBd, lista)
    // adiciono as inclusoes e alteracoes
    promises.push(...lista.filter(item => !excluidos || excluidos.indexOf(item.id) < 0)
      .map(item => obj.upsert(item, { transaction })))
    // adiciono as exclusoes de blocos
    if (excluidos && excluidos.length > 0) {
      promises.push(obj.destroy({ where: { id: excluidos }, transaction }))
    }
  }
  return promises
}
