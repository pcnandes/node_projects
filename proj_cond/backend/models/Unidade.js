module.exports = (sequelize, type) => {
  return sequelize.define('unidade', {
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
    },
    andar: {
      type: type.INTEGER,
      validate: {
        isInt: true,
        notNull: true,
        min: 1
      }
    }
    // Coloco os dados de usuário? Como fica o sindico que nao tem unidade, porteiro, etc?
  })
}
