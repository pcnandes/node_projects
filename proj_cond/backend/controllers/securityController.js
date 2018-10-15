const jwt = require('jsonwebtoken')
const tempoExpiracao = 60 * 3 // 3 minutos
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
  console.log('retoken')
  let token = req.headers['x-access-token']
  console.log(token)
  // console.log(req)
  if (token) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (!err) {
        console.log('decoded')
        console.log(decoded)
        // TODO recuperar usuario do banco
        const userLogado = { usuario: decoded.usuario, nome: decoded.nome, roles: decoded.roles }
        token = jwt.sign(userLogado, process.env.SECRET, {
          expiresIn: tempoExpiracao // '1h'
        })
      } else {
        token = null
        console.log(err)
      }
    })
  }
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
    req.userId = decoded.usuario
    next()
  })
}
/*
function verificaToken (token) {
  console.log('verificando Token')
  if (!token) {
    return null
  } else {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (err) return null
      console.log('decoded')
      console.log(decoded)
      // TODO recuperar usuario do banco
      const userLogado = { usuario: decoded.usuario, nome: decoded.nome, roles: decoded.roles }

      var newToken = jwt.sign(userLogado, process.env.SECRET, {
        expiresIn: tempoExpiracao // '1h'
      })
      return newToken
    })
  }
}
*/
