const express = require('express')
const security = require('../controllers/securityController')
const messages = require('../controllers/msgController')
const router = express.Router()

router.route('/login')
  .post(security.login)

router.route('/registrar')
  .post(security.registrar)

router.route('/retoken')
  .post(security.retoken)

router.route('/logout')
  .get(security.logout)

// Esse cara está aqui apenas ppara testes
router.route('/lista')
  .get(messages.listAll)

module.exports = router
