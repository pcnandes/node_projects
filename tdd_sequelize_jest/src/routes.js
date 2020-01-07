const routes = require('express').Router();
const SessionController = require('./app/controllers/session.controller')

// routes.post('/sessions', SessionController.store)

routes.post('/sessions', function(req, res) {
  return res.status(200).send();
})

module.exports = routes;