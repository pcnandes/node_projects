module.exports = (sequelize, type) => {
  const Funcionario = sequelize.define('Funcionario', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    funcao: {
      type: type.ENUM('SINDICO', 'SUB-SINDICO', 'CONSELHEIRO', 'PORTEIRO', 'FAXINEIRO', 'ZELADOR', 'AUX_SERV_GERAIS'),
      allowNull: false
    },
    cpf: {
      type: type.STRING
    },
    nome: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [1, 50]
      }
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
    }
  },
  { tableName: 'Funcionario' })

  Funcionario.associate = function ({ Usuario, FuncionarioCondominio, Condominio }) {
    Funcionario.belongsTo(Usuario, { as: 'usuario' })
    Funcionario.belongsToMany(Condominio, { as: 'condominios', through: FuncionarioCondominio })
  }

  return Funcionario
}
