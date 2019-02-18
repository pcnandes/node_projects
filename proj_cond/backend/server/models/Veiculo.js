module.exports = (sequelize, type) => {
  const Veiculo = sequelize.define('Veiculo', {

    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    tipo: {
      type: type.ENUM,
      values: ['CARRO', 'MOTO'],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    marca: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    modelo: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
    },
    cor: {
      type: type.ENUM,
      values: ['AZUL', 'AMARELO', 'BEGE', 'BRANCO', 'CINZA', 'GRAFITE', 'LARANJA', 'MARROM', 'PRETO', 'ROSA', 'VERMELHO', 'VERDE', 'VINHO'],
      allowNull: false,
      validate: {
        notEmpty: true
      }
    },
    placa: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      },
      dataExclusao: {
        field: 'data_exclusao',
        type: type.DATE,
        allowNull: true,
        defaultValue: null
      }
    }

  }, { tableName: 'morador' })

  Veiculo.associate = function ({ Unidade }) {
    Veiculo.belongsTo(Unidade, { as: 'unidade', allowNull: false, onDelete: 'CASCADE' })
  }

  return Veiculo
}
