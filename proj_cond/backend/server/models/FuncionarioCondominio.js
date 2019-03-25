// http://docs.sequelizejs.com/manual/tutorial/associations.html#belongs-to-many-associations
module.exports = (sequelize, type) => {
  const FuncionarioCondominio = sequelize.define('FuncionarioCondominio', {
    dataInicio: {
      field: 'data_inicio',
      type: type.DATE,
      defaultValue: type.NOW,
      allowNull: false
    },
    dataFim: {
      field: 'data_fim',
      type: type.DATE,
      allowNull: true,
      defaultValue: null
    }
  }, { tableName: 'funcionario_condominio', timestamps: false })

  return FuncionarioCondominio
}
