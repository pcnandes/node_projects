const jwt = require('jsonwebtoken')
const tempoExpiracao = 60 * 3 // 3 minutos
const persist = require('../persist/usuarioPersist')
const { onSuccess } = require('./../api/responses/successHandler')
const { onError, onErrorNaoAutorizado } = require('./../api/responses/errorHandler')
// TODO estudar e usar os codigos http corretos

exports.login = async function (req, res, next) {
  let credenciais = req.body
  try {
    if (credenciais.login && credenciais.senha) {
      // quando nao se pretende manipular ou alterar o  objeto user raw para retotnar objetos simples (plain)
      let usuarioLogado = await persist.findByLogin(credenciais.login)
      if (usuarioLogado && usuarioLogado.senha === credenciais.senha) {
        // const token = gerarToken(usuarioLogado.get({ plain: true }))
        const token = gerarToken(usuarioLogado)
        // res.status(200).send({ 'token': token })
        return onSuccess(res, { 'token': token })
      } // res.status(401).send({ data: null, message: 'Usuário ou senha inválidos' })
      return onErrorNaoAutorizado(res, 'Usuário ou senha inválidos')
    } else return onErrorNaoAutorizado(res, 'Informe o login e a senha!')
  } catch (err) {
    // res.status(500).send({ data: null, message: 'Erro ao acessar dados de usuario' })
    return onError(res, 'Erro ao acessar dados de usuario', err)
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
        console.log('decoded', decoded)
        // TODO recuperar usuario do banco
        const usuarioLogado = decoded.usuarioLogado
        token = gerarToken(usuarioLogado)
      } else {
        token = null
      }
    })
  }
  if (!token) {
    return onErrorNaoAutorizado(res, 'Token inválido!')
    // res.status(401).send('Token inválido!')
  } else {
    // res.status(200).send({ 'token': token })
    return onSuccess(res, { 'token': token })
  }
}

exports.logout = function (req, res) {
  // res.status(200).send({ token: null })
  return onSuccess(res, { 'token': null })
}

// TODO trocar nome para verificar acesso e usar verificaCaptcha
exports.verifyJWT = function (req, res, next) {
  // var token = req.headers['x-access-token']
  var token = req.headers['authorization']
  if (!token) {
    // return res.status(401).send({ auth: false, message: 'Token não enviado.' })
    return onErrorNaoAutorizado(res, 'Token não enviado.')
  }
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      // return res.status(500).send({ auth: false, message: 'Erro ao autenticar usando token.' })
      return onErrorNaoAutorizado(res, 'Erro ao autenticar usando token enviado.', err)
    }
    // se tudo estiver ok, salva no request para uso posterior
    // req.userId = decoded.usuario
    next()
  })
}

function gerarToken (usuario) {
  return jwt.sign({ usuarioLogado: usuario }, process.env.SECRET, {
    expiresIn: tempoExpiracao // '1h'
  })
}
