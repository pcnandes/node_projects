const db = require('./../../../server/models')

const initdb = function () {
  return db.sequelize.sync({ force: true })
}
module.exports = { initdb, db }
