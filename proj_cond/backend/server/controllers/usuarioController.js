const jwt = require('jsonwebtoken')
const tempoExpiracao = 60 * 3 // 3 minutos
const persist = require('../persist/usuarioPersist')
const { onSuccess } = require('./../api/responses/successHandler')
const { onError, onErrorNaoAutorizado } = require('./../api/responses/errorHandler')

exports.login = async function (req, res, next) {
  console.log('logiiiiin', req.body)
  let credenciais = req.body
  try {
    if (credenciais.login && credenciais.senha) {
      let login = credenciais.login
      let bloco = credenciais.bloco
      let usuarioLogado = await persist.findByLogin({ login, bloco })
      // TODO validar usando bcrypt
      if (usuarioLogado && usuarioLogado.usuario && usuarioLogado.usuario.senha === credenciais.senha) {
        const token = gerarToken(usuarioLogado)
        return onSuccess(res, { 'token': token })
      }
      return onErrorNaoAutorizado(res, 'Usuário ou senha inválidos')
    } else return onErrorNaoAutorizado(res, 'Informe o login e a senha!')
  } catch (err) {
    return onError(res, 'Erro ao acessar dados de usuario', err)
  }
}

// TODO olhar em https://www.codementor.io/olatundegaruba/5-steps-to-authenticating-node-js-with-jwt-7ahb5dmyr
exports.registrar = function (req, res, next) {
  return null
}

exports.retoken = function (req, res, next) {
  // let token = req.headers['x-access-token']
  try {
    let token = req.headers['authorization']
    if (token) {
      jwt.verify(token, process.env.SECRET, async function (err, decoded) {
        if (!err) {
          // const usuario = await persist.carregar(decoded.usuario.id)
          let login = decoded.usuario.login
          let bloco = decoded.unidade ? decoded.unidade.bloco.id : null
          const usuario = await persist.findByLogin({ login, bloco })
          token = await gerarToken(usuario)
          return onSuccess(res, { 'token': token })
        } else {
          return onErrorNaoAutorizado(res, 'Erro ao reautenticar!')
        }
      })
    }
    if (!token) {
      return onErrorNaoAutorizado(res, 'Token inválido!')
    }
  } catch (err) {
    return onError(res, 'Erro ao acessar dados de usuario', err)
  }
}

exports.logout = function (req, res) {
  return onSuccess(res, { 'token': null })
}

// TODO trocar nome para verificar acesso e usar verificaCaptcha
exports.verifyJWT = function (req, res, next) {
  let token = req.headers['authorization']
  if (!token) {
    return onErrorNaoAutorizado(res, 'Token não enviado.')
  }
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return onErrorNaoAutorizado(res, 'Erro ao autenticar usando token enviado.', err)
    }
    // se tudo estiver ok, deixo seguir o processamento
    next()
  })
}

function gerarToken (usuario) {
  return jwt.sign(usuario, process.env.SECRET, {
    expiresIn: tempoExpiracao // '1h'
  })
}
