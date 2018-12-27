module.exports = (sequelize, type) => {
  const Condominio = sequelize.define('Condominio', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    }
  }, { tableName: 'condominio', timestamps: false })

  Condominio.associate = function ({ Bloco }) {
    Condominio.hasMany(Bloco, { as: 'blocos' })
  }

  return Condominio
}
