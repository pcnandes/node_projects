module.exports = (sequelize, type) => {
  let Condominio = sequelize.define('condominio', {
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

  return Condominio
}
