module.exports = (sequelize, type) => {
  return sequelize.define('usuario', {
    id: {
      type: type.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    login: { type: type.STRING },
    senha: { type: type.STRING },
    perfil: { type: type.ENUM('ADMIN', 'SINDICO') }
  })

  // TODO incluir dados unidade {bloco, unidade}
  // incluir moradores {nome, email, telefone, celular, receberNotificacoes}
}
