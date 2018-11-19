module.exports = (sequelize, type) => {
  return sequelize.define('bloco', {
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
}
