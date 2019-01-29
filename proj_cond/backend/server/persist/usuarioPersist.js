const { Usuario, sequelize } = require('./../models')
const unidadePersist = require('./unidadePersist')
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
// WHERE (bloco.id is null and usuario.login = 'paulo') or (bloco.id=1 and usuario.login = 'paulo')
exports.findByLogin = function ({ login, bloco }) {
  return new Promise(async (resolve, reject) => {
    sequelize.query(
      `SELECT usuario.* FROM usuario
        left join unidade on usuario.unidade_id = unidade.id
        left join bloco on unidade.bloco_id = bloco.id
      WHERE (bloco.id is null and usuario.login = '${login}') 
        or (bloco.id=${bloco} and usuario.login = '${login}') limit 1`,
      { model: Usuario }
    )
      .then(async usuario => {
        if (usuario.length > 0) {
          usuario = usuario[0]
          let unidade = await unidadePersist.carregar(usuario.unidade_id)
          resolve({ usuario, unidade })
        } else resolve(null)
      })
      .cath(err => {
        reject(err)
      })
  })
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
