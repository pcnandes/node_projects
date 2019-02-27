module.exports = (sequelize, type) => {
  const UnidadeMorador = sequelize.define('UnidadeMorador', {
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
    tipo: {
      type: type.ENUM,
      values: ['MORADOR', 'LOCADOR', 'LOCATARIO'],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    nascimento: {
      field: 'data_nascimento',
      type: type.DATE,
      allowNull: true
    },
    email: {
      type: type.STRING,
      allowNull: true,
      lowercase: true,
      validate: {
        isEmail: true
      }
    },
    telefone: {
      type: type.STRING,
      allowNull: true
    },
    celular1: {
      type: type.STRING,
      allowNull: true
    },
    celular2: {
      type: type.STRING,
      allowNull: true
    },
    enviarNotificacaoEmail: {
      field: 'enviar_notificacao_email',
      type: type.BOOLEAN,
      defaultValue: true
    },
    responsavel: {
      type: type.BOOLEAN,
      allowNull: false,
      defaultValue: false
    },
    dataCriacao: {
      field: 'data_criacao',
      type: type.DATE,
      defaultValue: type.NOW,
      allowNull: false
    },
    dataExclusao: {
      field: 'data_exclusao',
      type: type.DATE,
      allowNull: true,
      defaultValue: null
    }

  }, { tableName: 'unidade_morador' })

  // permite apenas exclusao logica
  UnidadeMorador.associate = function ({ Unidade }) {
    UnidadeMorador.belongsTo(Unidade, { as: 'unidade', allowNull: false })
  }

  return UnidadeMorador
}
