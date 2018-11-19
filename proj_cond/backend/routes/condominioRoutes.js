const express = require('express')
const condominio = require('../controllers/condominioController')
// TODO descobrir uma forma de centralizar a autorização
const security = require('../controllers/securityController')
const router = express.Router()

router.route('/')
  .post(security.verifyJWT, condominio.salvar)

module.exports = router
