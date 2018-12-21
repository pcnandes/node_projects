module.exports = (sequelize, type) => {
  const Bloco = sequelize.define('bloco', {
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
    // unidades
  })

  Bloco.associate = function (model) {
    console.log('modelllllos', model)
    Bloco.belongsTo(model.condominio)
    Bloco.Unidade = Bloco.hasMany(model.unidade, { foreignKey: { allowNull: false }, onDelete: 'CASCADE', hooks: true })
  }

  return Bloco
}
