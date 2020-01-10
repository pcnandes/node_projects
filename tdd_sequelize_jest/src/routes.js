const routes = require('express').Router();
const SessionController = require('./app/controllers/session.controller')

routes.post('/sessions', SessionController.store);

module.exports = routes;