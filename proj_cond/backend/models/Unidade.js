module.exports = (sequelize, type) => {
  return sequelize.define('unidade', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    nome: { type: type.STRING },
    andar: { type: type.INTEGER }
    // Coloco os dados de usuário? Como fica o sindico que nao tem unidade, porteiro, etc?
  })
}
