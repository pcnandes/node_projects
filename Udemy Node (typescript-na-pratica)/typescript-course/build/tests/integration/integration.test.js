"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPStatus = require("http-status");
const helpers_1 = require("./config/helpers");
describe('Testes de Integração', () => {
    //gambiarra para que depois de compilado o node entenda que estamos trabalhando com es6
    'use strict';
    const config = require('../../server/config/env/config')();
    const model = require('../../server/models');
    let id;
    const userTest = {
        id: 100,
        name: 'User Teste',
        email: 'teste@email.com',
        password: 'teste'
    };
    const userDefault = {
        id: 1,
        name: 'Default User',
        email: 'default@email.com',
        password: 'default'
    };
    // executa antes de cada caso de testes
    beforeEach((done) => {
        // deleto todos os registros de usuario
        model.User.destroy({
            where: {}
        })
            // no retorno da deleção crio o usuario default
            .then(() => {
            return model.User.create(userDefault);
        })
            // no retorno da criacao do usario default, crio o usuário test
            .then(user => {
            model.User.create(userTest)
                .then(() => {
                done();
            });
        });
    });
    describe('GET /api/users/all', () => {
        it('Deve retornar um Json com todos os Usuários', done => {
            // vai subir nossa aplicação para eresponder as requisicoes
            helpers_1.request(helpers_1.app)
                .get('/api/users/all')
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.an('array');
                helpers_1.expect(res.body.payload[0].name).to.be.equal(userDefault.name);
                helpers_1.expect(res.body.payload[0].email).to.be.equal(userDefault.email);
                done(error);
            });
        });
    });
    describe('GET /api/users/:id', () => {
        it('Deve retornar um Json com apenas um Usuário', done => {
            helpers_1.request(helpers_1.app)
                .get(`/api/users/${userDefault.id}`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.equal(userDefault.id);
                // valida se retornou um opbjeto com todas as propriedades abaixo
                helpers_1.expect(res.body.payload).to.have.all.keys([
                    'id', 'name', 'email', 'password'
                ]);
                id = res.body.payload.id;
                done(error);
            });
        });
    });
    describe('POST /api/users/create', () => {
        it('Deve criar um novo Usuário', done => {
            const user = {
                id: 2,
                name: 'Usuário Teste',
                email: 'usuario@email.com',
                password: 'novouser'
            };
            helpers_1.request(helpers_1.app)
                .post('/api/users/create')
                .send(user)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload.id).to.be.eql(user.id);
                helpers_1.expect(res.body.payload.name).to.be.eql(user.name);
                helpers_1.expect(res.body.payload.email).to.be.eql(user.email);
                done(error);
            });
        });
    });
    describe('PUT /api/users/:id/update', () => {
        it('Deve atualizar um Usuários', done => {
            const user = {
                name: 'Teste Update',
                email: 'update@rmail.com'
            };
            helpers_1.request(helpers_1.app)
                .put(`/api/users/${id}/update`)
                .send(user)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload[0]).to.be.equal(1);
                done(error);
            });
        });
    });
    describe('DELETE /api/users/:id/destroy', () => {
        it('Deve deletar um Usuários', done => {
            helpers_1.request(helpers_1.app)
                .delete(`/api/users/${id}/destroy`)
                .end((error, res) => {
                helpers_1.expect(res.status).to.equal(HTTPStatus.OK);
                helpers_1.expect(res.body.payload).to.be.equal(1);
                done(error);
            });
        });
    });
});
