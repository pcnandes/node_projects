var express = require('express');
var security = require('../controllers/securityController');
var messages = require('../controllers/msgController');
var router = express.Router();

router.route('/login')
   .post(security.login);

router.route('/logout')
   .get(security.logout);

// Esse cara está aqui apenas ppara testes
router.route('/lista')
   .get(messages.listAll);

module.exports = router;