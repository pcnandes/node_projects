const express = require('express')
const controller = require('./../../controllers/funcionarioController')
const security = require('../../controllers/usuarioController')
const router = express.Router()

router.route('/')
  .get(security.verifyJWT, controller.listar)
  .post(security.verifyJWT, controller.novo)

router.route('/:id')
  .get(security.verifyJWT, controller.carregar)
  .put(security.verifyJWT, controller.salvar)

router.route('/condominio/:id')
  .get(security.verifyJWT, controller.listarCondominio)

module.exports = router
