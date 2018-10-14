const jwt = require('jsonwebtoken')
const tempoExpiracao = '1h'

exports.login = function (req, res, next) {
  let credenciais = req.body
  if (credenciais.usuario === 'paulo' && credenciais.senha === '123') {
    // auth ok
    const userLogado = { usuario: 1, nome: 'Paulo Fernandes', roles: ['Administrador', 'Gerente'] }

    var token = jwt.sign(userLogado, process.env.SECRET, {
      expiresIn: tempoExpiracao // '1h'
    })

    res.status(200).send({ 'token': token })
  } else {
    res.status(401).send('Login inválidooooo!')
  }
}

exports.retoken = function (req, res, next) {
  let token = verificaToken(req, res)
  if (!token) {
    res.status(401).send('Token inválido!')
  } else {
    res.status(200).send({ 'token': token })
  }
}

exports.logout = function (req, res) {
  res.status(200).send({ token: null })
}

// TODO trocar nome para verificar acesso e usar verificaCaptcha
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

function verificaToken (req, res) {
  var token = req.headers['x-access-token']
  if (!token) {
    return null
  } else {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) return null
      console.log(decoded)
      var newToken = jwt.sign(decoded, process.env.SECRET, {
        expiresIn: tempoExpiracao // '1h'
      })
      return newToken
    })
  }
}
