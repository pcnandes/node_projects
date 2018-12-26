module.exports = (sequelize, type) => {
  const Usuario = sequelize.define('Usuario', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login: { type: type.STRING },
    senha: { type: type.STRING },
    perfil: { type: type.ENUM('ADMIN', 'SINDICO') }
  }, { tableName: 'usuario', timestamps: false })

  Usuario.associate = function () {
    // associations can be defined here
  }

  return Usuario
  // TODO incluir dados unidade {bloco, unidade}
  // incluir moradores {nome, email, telefone, celular, receberNotificacoes}
}
