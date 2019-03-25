const express = require('express')
const controller = require('./../../controllers/usuarioController')
const router = express.Router()
const { verifyJWT } = require('../../controllers/usuarioController')

router.route('/')
  .get(verifyJWT, controller.listar)
  .post(verifyJWT, controller.novo)

router.route('/:id')
  .get(verifyJWT, controller.carregar)
  .put(verifyJWT, controller.salvar)

module.exports = router
