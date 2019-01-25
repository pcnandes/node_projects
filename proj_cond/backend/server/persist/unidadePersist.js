const { Condominio, Bloco, Unidade } = require('./../models')

exports.listar = function (usuario) {
  return Unidade.findAll()
}

exports.carregar = function (id) {
  return Unidade.findByPk(id, {
    include: [{
      model: Bloco,
      include: [{
        model: Condominio
      }]
    }]
  })
}

exports.alterar = async function (unidade) {
  return Unidade.build({ ...unidade }).save()
}
