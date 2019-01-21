const { Usuario, sequelize } = require('./../models')
const util = require('./util')

exports.cadastrar = async function (usuario, transaction) {
  usuario = util.parseJson(usuario)
  transaction = !transaction ? await sequelize.transaction() : transaction
  return Usuario.create(usuario, {
    transaction: transaction
  })
}
exports.listar = function (usuario) {
  return Usuario.findAll()
}

exports.carregar = function (id) {
  return Usuario.findByPk(id)
}

exports.findByLogin = function (login) {
  return Usuario.findOne({ where: { login: login }, raw: true })
}

exports.alterar = async function (usuario) {
  // carrego o condominio do banco
  let usuarioBd = await Usuario.findByPk(usuario.id)
  // verifico se existe o registro no banco
  if (!usuarioBd.id) {
    throw new Error()
  }

  Usuario.update(usuario, { where: { id: usuario.id } }).then(data => {
    return this.carregar(data.id)
  })
}
