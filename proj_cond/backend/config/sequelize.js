'use strict'
const Sequelize = require('sequelize')
const UsuarioModel = require('../models/Usuario')
const CondominioModel = require('../models/Condominio')
const BlocoModel = require('../models/Bloco')
const UnidadeModel = require('../models/Unidade')

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOSTNAME,
    dialect: 'mysql',
    pool: {
      max: 5,
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
const Condominio = CondominioModel(sequelize, Sequelize)
const Bloco = BlocoModel(sequelize, Sequelize)
const Unidade = UnidadeModel(sequelize, Sequelize)

// relacionamentos
// http://docs.sequelizejs.com/class/lib/associations/base.js~Association.html
// Condominio -> Bloco
// Condominio.Bloco = Condominio.hasMany(Bloco, { as: 'blocos' })
// Condominio.Bloco fica sendo o nome da associação, podendo ser acessado no create
Condominio.Bloco = Condominio.hasMany(Bloco)
Bloco.belongsTo(Condominio)
// Bloco Unidade
Bloco.Unidade = Bloco.hasMany(Unidade, { foreignKey: { name: 'bloco_id', allowNull: true }, defaultValue: null })
Unidade.belongsTo(Bloco)

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
  Usuario, Condominio, Bloco, Unidade
}
