module.exports = (sequelize, type) => {
  const Bloco = sequelize.define('Bloco', {
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
    }
    // unidades
  }, { tableName: 'bloco', timestamps: false })

  // nao sei pq o delete cascade funciona de uma maneira entre Bloco e unidade do que Condominio Bloco
  // aqui precisei indicar o cascade no belongsTo. Ja na unidade, se coloco no Belons To da problema
  Bloco.associate = function ({ Condominio, Unidade }) {
    Bloco.belongsTo(Condominio, { as: 'condominio', allowNull: false, onDelete: 'CASCADE', hooks: true })
    Bloco.hasMany(Unidade, { as: 'unidades', allowNull: false, onDelete: 'CASCADE', hooks: true })
  }

  return Bloco
}
