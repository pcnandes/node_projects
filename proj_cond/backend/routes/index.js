var express = require('express');
var messages = require('../controllers/msgController');
var router = express.Router();

router.route('/lista')
  .get(messages.list_all);

module.exports = router;
