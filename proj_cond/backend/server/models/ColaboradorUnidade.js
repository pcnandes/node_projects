module.exports = (sequelize, type) => {
  const ColaboradorUnidade = sequelize.define('ColaboradorUnidade', {

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
    observacao: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    tipoDoc: {
      type: type.ENUM,
      values: ['RG', 'CPF', 'CNPJ', 'HABILITACAO'],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    dataInicio: {
      field: 'data_criacao',
      type: type.DATE,
      defaultValue: type.NOW,
      allowNull: false
    },
    dataFim: {
      field: 'data_desativacao',
      type: type.DATE,
      allowNull: true,
      defaultValue: null
    }

  }, { tableName: 'colaborador_unidade' })

  ColaboradorUnidade.associate = function ({ Unidade }) {
    ColaboradorUnidade.belongsTo(Unidade, { as: 'unidade', allowNull: false, onDelete: 'CASCADE' })
  }

  return ColaboradorUnidade
}
