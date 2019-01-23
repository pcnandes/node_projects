module.exports = (sequelize, type) => {
  const Condominio = sequelize.define('Condominio', {
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
    situacao: {
      type: type.ENUM,
      values: ['RASCUNHO', 'ATIVO', 'INATIVO'],
      defaultValue: 'RASCUNHO',
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, { tableName: 'condominio', timestamps: false })

  Condominio.associate = function ({ Bloco }) {
    Condominio.hasMany(Bloco, { as: 'blocos' })
  }

  return Condominio
}
