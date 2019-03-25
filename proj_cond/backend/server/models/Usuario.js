const bcrypt = require('bcrypt')
const saltRounds = 12

module.exports = (sequelize, type) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50]
      }
    },
    senha: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 240]
      },
      set (val) {
        let passwd = bcrypt.hashSync(val, saltRounds)
        this.setDataValue('senha', passwd)
      }
    },
    perfis: {
      // type: type.ENUM('ADMIN', 'SINDICO', 'SUB-SINDICO', 'FUNCIONARIO', 'MORADOR'),
      type: type.STRING,
      get () {
        let perfis = this.getDataValue('perfis')
        if (perfis) return perfis.split(',')
        else return null
      }
    }
  },
  {
    tableName: 'usuario',
    indexes: [
      { fields: ['login', 'unidade_id'], name: 'usuario_unique' }
    ]
  })

  Usuario.associate = function ({ Unidade, Funcionario }) {
    Usuario.belongsTo(Unidade, { as: 'unidade' })
    Unidade.hasOne(Funcionario, { as: 'funcionario', allowNull: true })
  }

  return Usuario
}
