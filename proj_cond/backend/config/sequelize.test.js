require('dotenv-safe').config({
  allowEmptyValues: true
})
// configuro o banco de teste para ser usado
process.env.DB_NAME = process.env.DB_NAME_TEST

const { sequelize } = require('./sequelize')

const initdb = function () {
  // return sequelize.sync({ force: true })
  return sequelize.sync({ force: true })
  // export { Usuario, Condominio, Bloco, Unidade }
}
module.exports = { initdb }
