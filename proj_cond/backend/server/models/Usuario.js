module.exports = (sequelize, type) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50]
      }
    },
    senha: {
      type: type.STRING,
      allowNull: false,
      validate: {
        notEmpty: true,
        len: [3, 50]
      }
    },
    perfil: {
      type: type.ENUM('ADMIN', 'SINDICO'),
      allowNull: false,
      validate: {
        notEmpty: true
      }
    }
  }, { tableName: 'usuario' })

  Usuario.associate = function () {
    // associations can be defined here
  }

  return Usuario
  // TODO incluir dados unidade {bloco, unidade}
  // incluir moradores {nome, email, telefone, celular, receberNotificacoes}
}
