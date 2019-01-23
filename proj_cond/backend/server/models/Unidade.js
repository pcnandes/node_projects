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
        len: [1, 50]
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

  Unidade.associate = function ({ Bloco, Morador, Usuario }) {
    Unidade.belongsTo(Bloco)
    Unidade.hasOne(Usuario, { as: 'usuario', foreignKey: { name: 'id', allowNull: true }, targetKey: 'id', onDelete: 'CASCADE', hooks: true })
    Unidade.hasMany(Morador, { as: 'moradores', foreignKey: { allowNull: true }, onDelete: 'CASCADE', hooks: true })
  }

  return Unidade
}
