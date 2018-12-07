module.exports = (sequelize, type) => {
  return sequelize.define('unidade', {
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
    },
    andar: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      }
    }
    // Coloco os dados de usuário? Como fica o sindico que nao tem unidade, porteiro, etc?
  })
}
