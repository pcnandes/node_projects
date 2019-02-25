module.exports = (sequelize, type) => {
  const UnidadeColaborador = sequelize.define('UnidadeColaborador', {

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
      allowNull: true,
      validate: {
        notEmpty: false,
        len: [1, 50]
      }
    },
    tipoDoc: {
      type: type.ENUM,
      values: ['RG', 'CPF', 'CNPJ'],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    // todo Validar
    numeroDoc: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 20]
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

  }, { tableName: 'unidade_colaborador' })

  UnidadeColaborador.associate = function ({ Unidade }) {
    UnidadeColaborador.belongsTo(Unidade, { as: 'unidade', allowNull: false, onDelete: 'CASCADE' })
  }

  return UnidadeColaborador
}
