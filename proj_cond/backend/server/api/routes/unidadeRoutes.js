const express = require('express')
const controller = require('./../../controllers/unidadeController')
// TODO descobrir uma forma de centralizar a autorização
const security = require('../../controllers/usuarioController')
const router = express.Router()

router.route('/')
  .get(security.verifyJWT, controller.listar)

router.route('/:id')
  .get(security.verifyJWT, controller.carregar)
  .put(security.verifyJWT, controller.salvar)

module.exports = router
