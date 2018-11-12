module.exports = (sequelize, type) => {
  return sequelize.define('bloco', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: { type: type.STRING }
    // unidades
  })
}
