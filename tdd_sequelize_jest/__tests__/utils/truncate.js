const { sequelize } = require('../../src/app/models')

module.exports = () => {
  // deleta todos os dados do banco
  return Promise.all(
    Object.keys(sequelize.models).map(key => {
      return sequelize.models[key].destroy({ truncate: true, force: true })
    })
  );
}