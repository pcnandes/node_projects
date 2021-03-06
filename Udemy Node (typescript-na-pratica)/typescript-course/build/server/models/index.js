'use strict';
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const basename = path.basename(__filename);
const config = require('./../config/env/config')();
const env = config.env || 'development';
const db = {};
let sequelize;
if (config.dbURL) {
    sequelize = new Sequelize(config.dbURL);
}
else {
    sequelize = new Sequelize(config.db, config.username, config.password);
}
fs
    .readdirSync(__dirname)
    .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
})
    .forEach(file => {
    const model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model;
});
Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
        db[modelName].associate(db);
    }
});
// esse errro ocorre poque esse arquivo foi gerado pelo sequelize e nao segue os padroes do typescript
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
