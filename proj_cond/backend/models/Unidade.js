module.exports = (sequelize, type) => {
  const Unidade = sequelize.define('Unidade', {
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
  }, { tableName: 'unidade' })

  // nao sei pq o delete cascade funciona de uma maneira entre Bloco e unidade do que Condominio Bloco
  Unidade.associate = function ({ Bloco }) {
    Unidade.belongsTo(Bloco)
  }
  return Unidade
}
