module.exports = (sequelize, type) => {
  const Unidade = sequelize.define('Unidade', {
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
    andar: {
      type: type.INTEGER,
      allowNull: false,
      validate: {
        isInt: true,
        min: 1
      }
    }
    // Coloco os dados de usuário? Como fica o sindico que nao tem unidade, porteiro, etc?
  }, {
    tableName: 'unidade',
    indexes: [
      { fields: ['nome', 'bloco_id'], name: 'unidade_unique' }
    ]
  })

  Unidade.associate = function ({ Bloco, UnidadeMorador, UnidadeVeiculo, UnidadeColaborador, Usuario }) {
    Unidade.belongsTo(Bloco, { as: 'bloco' })
    // Unidade.hasOne(Usuario, { as: 'usuario', allowNull: true, onDelete: 'CASCADE', hooks: true })
    Unidade.hasOne(Usuario, { allowNull: true, onDelete: 'CASCADE', hooks: true })
    // permite apenas exclusao logica
    Unidade.hasMany(UnidadeMorador, { as: 'moradores', allowNull: true, onDelete: 'CASCADE', hooks: true })
    // permite apenas exclusao logica
    Unidade.hasMany(UnidadeVeiculo, { as: 'veiculos', allowNull: true, onDelete: 'CASCADE', hooks: true })
    // não permite exclusao
    Unidade.hasMany(UnidadeColaborador, { as: 'colaboradores', allowNull: true, onDelete: 'CASCADE', hooks: true })
  }

  return Unidade
}
