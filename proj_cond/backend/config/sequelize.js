const Sequelize = require('sequelize')
const UsuarioModel = require('./../models/usuario')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      underscored: true,
      freezeTableName: true,
      charset: 'utf8',
      dialectOptions: {
        collate: 'utf8_general_ci'
      },
      timestamps: false
    },
    operatorsAliases: Sequelize.Op
  }
)

const Usuario = UsuarioModel(sequelize, Sequelize)
// testa conexao
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.')
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err)
  })

// se passar true o modelo sera criado a cada inicializacao
sequelize.sync({ force: false })
  .then(() => {
    console.log(`base de dados e tabelas criados!`)
  })

module.exports = {
  Usuario
}
