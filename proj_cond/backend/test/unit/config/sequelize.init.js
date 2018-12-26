const db = require('./../../../models')

const initdb = function () {
  return db.sequelize.sync({ force: true })
}
module.exports = { initdb, db }
