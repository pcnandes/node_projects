var express = require('express')
var parseurl = require('parseurl')
var session = require('express-session')

var app = express()

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:8080");
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {}
  }
  if(!req.session.user) {
    req.session.user = 'tente novamente'
  } else req.session.user = 'deu certo!'

  // get the url pathname
  var pathname = parseurl(req).pathname

  // count the views
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1

  next()
})

app.get('/foo', function (req, res, next) {
  res.send('you viewed this page ' + req.session.views['/foo'] + ' times')
})

app.get('/bar', function (req, res, next) {
  res.send('you viewed this page ' + req.session.user)
})

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});