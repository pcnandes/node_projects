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
        len: [3, 50]
      }
    },
    perfis: {
      // type: type.ENUM('ADMIN', 'SINDICO'),
      type: type.STRING,
      get () {
        let perfis = this.getDataValue('perfis')
        if (perfis) return perfis.split(',')
        else return null
      }
    }
  }, { tableName: 'usuario' })

  Usuario.associate = function ({ Unidade }) {
    Usuario.belongsTo(Unidade, { as: 'unidade' })
  }

  return Usuario
}
