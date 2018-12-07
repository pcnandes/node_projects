"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const interface_1 = require("./interface");
const model = require('../../models');
class User {
    constructor() { }
    // recebe dados do usuario e salva no banco
    create(user) {
        return model.User.create(user);
    }
    getAll() {
        return model.User.findAll({
            order: ['name']
        })
            // createUsers vai popular o objeto
            .then(interface_1.createUsers);
    }
    getById(id) {
        return model.User.findOne({
            where: { id }
        })
            .then(interface_1.createUserById);
    }
    getByEmail(email) {
        return model.User.findOne({
            where: { email }
        })
            .then(interface_1.createUserByEmail);
    }
    update(id, user) {
        // indica quais campos sao atualizaveis
        return model.User.update(user, {
            where: { id },
            fields: ['name', 'email', 'password']
        });
    }
    delete(id) {
        return model.User.destroy({
            where: { id }
        });
    }
}
exports.default = User;
