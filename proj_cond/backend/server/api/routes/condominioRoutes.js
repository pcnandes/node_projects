const express = require('express')
const controller = require('./../../controllers/condominioController')
const security = require('../../controllers/usuarioController')
const router = express.Router()

router.route('/')
  .get(security.verifyJWT, controller.listar)
  .post(security.verifyJWT, controller.novo)

router.route('/:id')
  .get(security.verifyJWT, controller.carregar)
  .put(security.verifyJWT, controller.salvar)
  .delete(security.verifyJWT, controller.excluir)

router.route('/:id/gerar_contas_usuario')
  .put(security.verifyJWT, controller.gerarContasUsuario)

module.exports = router
