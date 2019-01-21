const express = require('express')
const condominio = require('./../../controllers/condominioController')
// TODO descobrir uma forma de centralizar a autorização
const security = require('../../controllers/usuarioController')
const router = express.Router()

router.route('/')
  .get(security.verifyJWT, condominio.listar)
  .post(security.verifyJWT, condominio.novo)

router.route('/gerar_contas_usuario')
  .put(security.verifyJWT, condominio.gerarContasUsuario)

router.route('/:id')
  .get(security.verifyJWT, condominio.carregar)
  .put(security.verifyJWT, condominio.salvar)
  .delete(security.verifyJWT, condominio.excluir)

module.exports = router
