module.exports = (sequelize, type) => {
  const Condominio = sequelize.define('condominio', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: {
      type: type.STRING,
      allowNull: true,
      validate: {
        notEmpty: true,
        len: [2, 50]
      }
    }
  },
  {
    hooks: {
      beforeUpdate: async (condominio, options) => {}
    }
  })

  Condominio.associate = function (models) {
    Condominio.Bloco = Condominio.hasMany(models.bloco, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', hooks: true })
  }

  return Condominio
}
