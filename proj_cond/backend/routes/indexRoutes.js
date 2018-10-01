const express = require('express')
const messages = require('../controllers/msgController')
// TODO descobrir uma forma de centralizar a autorização
const security = require('../controllers/securityController')
const router = express.Router()

router.route('/lista_sec')
  .get(security.verifyJWT, messages.listAll)

module.exports = router
