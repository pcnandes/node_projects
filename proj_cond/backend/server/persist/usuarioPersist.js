const { Usuario, Unidade, Bloco, Condominio, sequelize } = require('./../models')
const util = require('./util')
const bcrypt = require('bcrypt')
const saltRounds = 12

exports.cadastrar = async function (usuario, transaction) {
  usuario = util.parseJson(usuario)
  transaction = !transaction ? await sequelize.transaction() : transaction
  return Usuario.create(usuario, {
    transaction: transaction
  })
}

// TODO falta testar
exports.alterarSenha = function (usuario) {
  let senha = gerarSenhaHash(usuario.senha)
  return Usuario.update({ 'senha': senha }, {
    where: { id: usuario.id }
  })
}

exports.listar = function (usuario) {
  return Usuario.findAll()
}

exports.listarSemMorador = function (usuario) {
  return Usuario.findAll({
    where: {
      perfis: {
        [sequelize.Op.notLike]: '%MORADOR%'
      }
    },
    include: [{ model: Unidade,
      as: 'unidade',
      include: [{
        model: Bloco,
        as: 'bloco',
        include: [{
          model: Condominio,
          as: 'condominio'
        }]
      }]
    }],
    order: [['login', 'ASC']]
  })
}

exports.carregar = function (id) {
  return Usuario.findByPk(id, {
    include: [{
      model: Unidade,
      as: 'unidade',
      include: [{
        model: Bloco,
        as: 'bloco',
        include: [{
          model: Condominio,
          as: 'condominio'
        }]
      }]
    }]
  })
}
/* TENTATIVA DE FAZER A CONSULTA
exports.findByLoginERRO = function (credenciais) {
  const Op = sequelize.Op
  // let usuario = login.login
  return new Promise(async (resolve, reject) => {
    Usuario.findOne({
      where: { login: credenciais.login },
      include: [{
        model: Unidade,
        as: 'unidade',
        include: [{
          model: Bloco,
          as: 'bloco',
          where: { id: { [Op.or]: [null, credenciais.bloco] } },
          // WHERE (bloco.id is null and usuario.login = '${login.login}')
          // or (bloco.id=${login.bloco} and usuario.login = '${login.login}') limit 1`,
          include: [{
            model: Condominio,
            as: 'condominio'
          }]
        }]
      }]
    })
      .then(usuario => {
        console.log(usuario)
        if (usuario) resolve(usuario)
        else reject(new Error('Usuario não encontrado'))
      })
      .cath(err => {
        reject(err)
      })
  })
}
*/

// WHERE (bloco.id is null and usuario.login = 'paulo') or (bloco.id=1 and usuario.login = 'paulo')
exports.findByLogin = function (credenciais) {
  // TODO o ideal seria usar as consultas do proprio sequelize, mas nao consegui.
  // no afim, achei melhor consultar duas vezes que montar o objeto na mao, visto que se o objeto mudar
  // terei q acertar a consulta
  return new Promise(async (resolve, reject) => {
    sequelize.query(
      `SELECT usuario.id FROM usuario
        left join unidade on usuario.unidade_id = unidade.id
        left join bloco on unidade.bloco_id = bloco.id
      WHERE (bloco.id is null and usuario.login = :login) 
        or (bloco.id=:bloco and usuario.login = :login) limit 1`,
      { replacements: { login: credenciais.login, bloco: credenciais.bloco }, type: sequelize.QueryTypes.SELECT }
    )
      .then(async idUsuario => {
        if (idUsuario.length > 0) {
          idUsuario = idUsuario[0].id
          let retorno = await this.carregar(idUsuario)
          resolve(retorno)
        } else resolve(null)
      })
      .cath(err => {
        reject(err)
      })
  })
}

exports.alterar = async function (usuario) {
  // carrego o condominio do banco
  let usuarioBd = await Usuario.findByPk(usuario.id)
  // verifico se existe o registro no banco
  if (!usuarioBd.id) {
    throw new Error()
  }

  Usuario.update(usuario, { where: { id: usuario.id } }).then(data => {
    return this.carregar(data.id)
  })
}

function gerarSenhaHash (senha) {
  return bcrypt.hashSync(senha, saltRounds)
}
