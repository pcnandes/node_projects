module.exports = (sequelize, type) => {
  const Morador = sequelize.define('Morador', {
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
      type: type.ENUM('MORADOR', 'LOCADOR', 'LOCATARIO'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    email: {
      type: type.STRING,
      allowNull: true,
      validate: {
        isEmail: true
      }
    },
    telefone: {
      type: type.STRING,
      allowNull: true,
      validate: {
        isNumeric: true
      }
    },
    celular: {
      type: type.STRING,
      allowNull: true,
      validate: {
        isNumeric: true
      }
    },
    enviarNotificacaoEmail: {
      field: 'enviar_notificacao_email',
      type: type.BOOLEAN,
      defaultValue: true
    },
    enviarNotificacaoPush: {
      field: 'enviar_notificacao_push',
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
    dataDesativacao: {
      field: 'data_desativacao',
      type: type.DATE,
      allowNull: true,
      defaultValue: null
    }

  }, { tableName: 'morador' })

  Morador.associate = function ({ Unidade }) {
    Morador.belongsTo(Unidade, { as: 'unidade', allowNull: false, onDelete: 'CASCADE' })
  }

  return Morador
}
