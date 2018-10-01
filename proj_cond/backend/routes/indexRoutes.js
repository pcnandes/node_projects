var express = require('express');
var messages = require('../controllers/msgController');
// TODO descobrir uma forma de centralizar a autorização
var security = require('../controllers/securityController');
var router = express.Router();

router.route('/lista')
  .get(messages.listAll);

router.route('/lista_sec')
  .get(security.verifyJWT, messages.listAll);

module.exports = router;
