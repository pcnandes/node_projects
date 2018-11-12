module.exports = (sequelize, type) => {
  return sequelize.define('condominio', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: { type: type.STRING }
  })
}
