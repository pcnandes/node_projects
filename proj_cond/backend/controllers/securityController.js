const jwt = require('jsonwebtoken')

exports.login = function (req, res, next) {
  let credenciais = req.body
  if (credenciais.usuario === 'paulo' && credenciais.senha === '123') {
    // auth ok
    const userLogado = { 'nome': 'Paulo Fernandes', perfis: ['Administrador', 'Gerente'] }

    var token = jwt.sign(userLogado, process.env.SECRET, {
      expiresIn: '1h' // expires in 5min
    })
    res.status(200).send(token)
  } else {
    res.status(401).send('Login inválidooooo!')
  }
}

exports.logout = function (req, res) {
  res.status(200).send({ token: null })
}

exports.verifyJWT = function (req, res, next) {
  var token = req.headers['x-access-token']
  if (!token) return res.status(401).send({ auth: false, message: 'No token provided.' })
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) return res.status(500).send({ auth: false, message: 'Failed to authenticate token.' })
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id
    next()
  })
}
