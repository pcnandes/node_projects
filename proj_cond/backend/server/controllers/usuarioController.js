const jwt = require('jsonwebtoken')
const tempoExpiracao = 60 * 3 // 3 minutos
const persist = require('../persist/usuarioPersist')
const condominioPersist = require('../persist/condominioPersist')
const { onSuccess } = require('./../api/responses/successHandler')
const { onError, onErrorNaoAutorizado } = require('./../api/responses/errorHandler')
const bcrypt = require('bcrypt')
let usuarioLogado = null

exports.listar = async function (req, res) {
  try {
    let retorno = await persist.listarSemMorador()
    return onSuccess(res, retorno)
  } catch (err) {
    return onError(res, 'Erro ao listar os usuarios', err)
  }
}

exports.novo = async function (req, res, next) {
}

exports.carregar = async function (req, res, next) {
}

exports.salvar = async function (req, res, next) {
}

exports.login = async function (req, res, next) {
  let credenciais = { login: req.body.login, senha: req.body.senha, condominio: req.body.condominio.id, bloco: req.body.bloco.id }
  try {
    if (credenciais.login && credenciais.senha) {
      let usuarioLogado = await persist.findByLogin(credenciais)
      if (usuarioLogado && await verificaSenha(credenciais.senha, usuarioLogado.senha)) {
        let condominioLogin = await condominioPersist.carregar(credenciais.condominio)
        let blocoLogin = condominioLogin.blocos.filter(bl => bl.id === credenciais.bloco)
        blocoLogin = blocoLogin.length > 0 ? blocoLogin[0] : null
        const token = gerarToken({ usuario: usuarioLogado, condominioLogin, blocoLogin }, credenciais.lembreDeMim)
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
          let bloco = decoded.blocoLogin ? decoded.blocoLogin.id : null
          console.log('decoded', decoded)
          const usuario = await persist.findByLogin({ login, bloco })
          token = await gerarToken({ usuario, condominioLogin: [decoded.condominioLogin], blocoLogin: [decoded.blocoLogin] }, null)
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

function gerarToken (obj, lembrar) {
  obj = JSON.parse(JSON.stringify(obj))
  return jwt.sign({ ...obj }, process.env.SECRET, {
    expiresIn: !lembrar ? tempoExpiracao : 60 * 60 // 1h, depous alterar para 1 semana
  })
}

// TODO incluir function dentro do usuario
async function verificaSenha (senhaInformada, senhaUsuario) {
  // uso o bcrypt, ou caso a senha nao tenha passada pelo bcript (usuario inserido manualmente no banco verifico se são iguais)
  let retorno = await bcrypt.compareSync(senhaInformada, senhaUsuario) || senhaInformada === senhaUsuario
  return retorno
}
