const jwt = require('jsonwebtoken')
const tempoExpiracao = 60 * 3 // 3 minutos

exports.login = function (req, res, next) {
  let credenciais = req.body
  // TODO recuperar no banco dados do usuario
  if (credenciais.usuario === 'paulo' && credenciais.senha === '123') {
    // TODO recuperar usuário logado do banco
    const userLogado = { usuario: 1, nome: 'Paulo Fernandes', roles: ['Administrador', 'Gerente'] }
    const token = gerarToken(userLogado)
    res.status(200).send({ 'token': token })
  } else {
    res.status(401).send('Login inválidooooo!')
  }
}

// TODO olhar em https://www.codementor.io/olatundegaruba/5-steps-to-authenticating-node-js-with-jwt-7ahb5dmyr
exports.registrar = function (req, res, next) {
  return null
}

exports.retoken = function (req, res, next) {
  let token = req.headers['x-access-token']
  if (token) {
    jwt.verify(token, process.env.SECRET, function (err, decoded) {
      if (!err) {
        // TODO recuperar usuario do banco
        const userLogado = { usuario: decoded.usuario, nome: decoded.nome, roles: decoded.roles }
        token = gerarToken(userLogado)
      } else {
        token = null
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
  if (!token) {
    return res.status(401).send({ auth: false, message: 'Token não enviado.' })
  }
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return res.status(500).send({ auth: false, message: 'Erro ao autenticar usando token.' })
    }
    // se tudo estiver ok, salva no request para uso posterior
    // req.userId = decoded.usuario
    next()
  })
}

function gerarToken (userLogado) {
  return jwt.sign(userLogado, process.env.SECRET, {
    expiresIn: tempoExpiracao // '1h'
  })
}
