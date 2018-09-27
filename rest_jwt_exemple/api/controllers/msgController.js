'use strict';
var mongoose = require('mongoose'),
Message = mongoose.model('Messages');

exports.list_all_messages = function(req, res) {
   Message.find({}, function(err, msg) {
      if (err)
      res.send(err);
      res.json(msg);
   });
};

exports.create_a_message = function(req, res) {
   var new_msg = new Message(req.body);
   new_msg.save(function(err, msg) {
   if (err)
      res.send(err);
   res.json(msg);
   });
};

exports.read_a_message = function(req, res) {
   Message.findById(req.params.msgId, function(err, msg) {
   if (err)
      res.send(err);
   res.json(msg);
   });
};

exports.update_a_message = function(req, res) {
   Message.findOneAndUpdate({_id: req.params.msgId}, req.body, {new: true}, function(err, msg) {
   if (err)
      res.send(err);
   res.json(msg);
   });
};

exports.delete_a_message = function(req, res) {
   Message.remove({
      _id: req.params.msgId
   }, function(err, msg) {
   if (err)
      res.send(err);
   res.json({ message: 'Message successfully deleted' });
   });
};

exports.login = function (req, res, next) {
    if(req.body.user === 'luiz' && req.body.pwd === '123'){
      //auth ok
      const id = 1; //esse id viria do banco de dados
      var token = jwt.sign({ id }, process.env.SECRET, {
        expiresIn: 300 // expires in 5min
      });
      res.status(200).send({ auth: true, token: token });
    }
    res.status(500).send('Login inválido!');
  };
  
  exports.verify_jwt = function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err, decoded) {
      if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
      req.userId = decoded.id;
      next();
    });
    
  }