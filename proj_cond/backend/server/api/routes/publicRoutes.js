const express = require('express')
const security = require('../../controllers/usuarioController')
const router = express.Router()

router.route('/login')
  .post(security.login)

router.route('/registrar')
  .post(security.registrar)

router.route('/retoken')
  .post(security.retoken)

router.route('/logout')
  .get(security.logout)

module.exports = router
