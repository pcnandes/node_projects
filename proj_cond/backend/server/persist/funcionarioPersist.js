const { Funcionario, Condominio } = require('./../models')
const util = require('./util')

exports.cadastrar = async function (funcionario) {
  funcionario = util.parseJson(funcionario)
  return Funcionario.create(funcionario)
}
exports.listar = async function (funcionario) {
  return Funcionario.findAll({
    include: [{
      model: Condominio,
      as: 'condominios'
    }],
    order: [['nome', 'ASC']]
  })
}

exports.listarCondominio = async function (id) {
  return Funcionario.findAll({
    include: [
      { model: Condominio,
        as: 'condominios',
        through: {
          attributes: ['dataInicio', 'dataFim'],
          where: { condominioId: id }
        }
      }
    ],
    order: [['nome', 'ASC']]
  })
}

exports.carregar = async function (id) {
  return Funcionario.findByPk(id, {
    include: [{
      model: Condominio,
      as: 'condominios'
    }]
  })
}

exports.alterar = async function (funcionario) {
  let funcionarioBd = await Funcionario.findByPk(funcionario.id, { include: ['condominios'] })
  // verifico se existe o registro no banco
  if (!funcionarioBd.id) throw new Error()
  return Funcionario.update(funcionario, { where: { id: funcionario.id } })
}
