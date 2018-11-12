module.exports = (sequelize, type) => {
  return sequelize.define('Bloco', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: { type: type.STRING }
    // unidades
  })
}
