
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
