const jwt = require('jsonwebtoken')
const tempoExpiracao = 60 * 3 // 3 minutos
const persist = require('../persist/usuarioPersist')
const { onSuccess } = require('./../api/responses/successHandler')
const { onError, onErrorNaoAutorizado } = require('./../api/responses/errorHandler')
const bcrypt = require('bcrypt')
let usuarioLogado = null

exports.login = async function (req, res, next) {
  let credenciais = req.body
  try {
    if (credenciais.login && credenciais.senha) {
      let usuarioLogado = await persist.findByLogin(credenciais)
      if (usuarioLogado && await verificaSenha(credenciais.senha, usuarioLogado.senha)) {
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
          let bloco = decoded.usuario.unidade ? decoded.usuario.unidade.bloco.id : null
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

exports.verifyJWT = function (req, res, next) {
  let token = req.headers['authorization']
  if (!token) {
    return onErrorNaoAutorizado(res, 'Token não enviado.')
  }
  jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return onErrorNaoAutorizado(res, 'Erro ao autenticar usando token enviado.', err)
    }
    usuarioLogado = carregarUsuario(req)
    // se tudo estiver ok, deixo seguir o processamento
    next()
  })
  // usuarioLogado = carregarUsuario(req)
  // if (!usuarioLogado) return onErrorNaoAutorizado(res, 'Token não enviado.')
  // se tudo estiver ok, deixo seguir o processamento
  // next()
}

exports.getUsuarioLogado = function (req) {
  return usuarioLogado
}

exports.possuiPerfil = function (perfil) {
  let perfis = []
  perfis.push(perfil)
  return _possuiPerfis(perfis)
}

exports.possuiPerfis = function (perfis) {
  return _possuiPerfis(perfis)
}

function _possuiPerfis (perfis) {
  // verifico se existe exigencia de perfil
  if (!perfis || perfis.length === 0) return true
  let _perfis = usuarioLogado ? usuarioLogado.perfis : null
  if (!_perfis) return false
  // verifico se o usuario possui o perfil
  return perfis.some(_perfil => _perfis.some(perfil => perfil === _perfil))
}

function carregarUsuario (req) {
  let token = req.headers['authorization']
  if (!token) {
    return null
  }
  let retorno = jwt.verify(token, process.env.SECRET, function (err, decoded) {
    if (err) {
      return null
    } else return decoded.usuario
  })
  return retorno
}

function gerarToken (usuario) {
  usuario = JSON.parse(JSON.stringify(usuario))
  return jwt.sign({ usuario }, process.env.SECRET, {
    expiresIn: tempoExpiracao // '1h'
  })
}

async function verificaSenha (senhaInformada, senhaUsuario) {
  // uso o bcrypt, ou caso a senha nao tenha passada pelo bcript (usuario inserido manualmente no banco verifico se são iguais)
  let retorno = await bcrypt.compareSync(senhaInformada, senhaUsuario) || senhaInformada === senhaUsuario
  return retorno
}
