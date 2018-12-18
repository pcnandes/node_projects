
exports.getItensExcluidos = function (originais, alterados) {
  let excluidos = []
  if (!!originais && !!alterados) {
    excluidos = originais.filter(itemBd => alterados.find(itemAlt => itemAlt.id === itemBd.id) === undefined)
    if (excluidos) {
      excluidos = excluidos.map(item => item.id)
    }
  }
  return excluidos
}
