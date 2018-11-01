const jwt = require('jsonwebtoken')
const tempoExpiracao = 60 * 3 // 3 minutos
const { Usuario } = require('./../config/sequelize')
// TODO estudar e usar os codigos http corretos

exports.login = async function (req, res, next) {
  let credenciais = req.body
  try {
    if (credenciais.usuario && credenciais.senha) {
      // quando nao se pretende manipular ou alterar o  objeto user raw para retotnar objetos simples (plain)
      let usuarioLogado = await Usuario.findOne({ where: { login: credenciais.usuario }, raw: true })
      if (usuarioLogado.senha === credenciais.senha) {
        // const token = gerarToken(usuarioLogado.get({ plain: true }))
        const token = gerarToken(usuarioLogado)
        res.status(200).send({ 'token': token })
      } res.status(401).send({ data: null, message: 'Usuário ou senha inválidos' })
    } else res.status(401).send('Informe o login e a senha!')
  } catch (err) {
    console.log(err)
    res.status(500).send({ data: null, message: 'Erro ao acessar dados de usuario' })
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

function gerarToken (usuario) {
  return jwt.sign({ usuarioLogado: usuario }, process.env.SECRET, {
    expiresIn: tempoExpiracao // '1h'
  })
}
