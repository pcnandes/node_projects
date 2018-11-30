const { Condominio } = require('./../config/sequelize')

exports.salvar = async function (req, res) {
  try {
    let condominio = req.body
    console.log(condominio)
    const retorno = await Condominio.create({
      nome: condominio.nome
    })
    return res.status(200).send(retorno)
  } catch (err) {
    console.erro(err)
    return res.status(400).send({ data: null, message: 'Erro ao cadastrar condominio', erro: err })
  }
}

exports.listar = async function (req, res) {
  try {
    // TODO INCLUIR WHERE PEGANDO OS CONDOMINIOS DO SINDICO OU TDS PARA O ADMINISTRADOR
    let retorno = await Condominio.findAll()
    return res.status(200).send(retorno)
  } catch (err) {
    console.log(err)
    res.status(500).send({ data: null, message: 'Erro ao listar os condomínios', erro: err })
  }
}

exports.carregar = async function (req, res) {
  try {
    let id = req.params.id
    if (id) {
      let retorno = await Condominio.findById(id)
      return res.status(200).send(retorno)
    } else res.status(500).send({ data: null, message: 'Id nao informado', erro: null })
  } catch (err) {
    console.log(err)
    res.status(500).send({ data: null, message: 'Erro ao listar os condomínios', erro: err })
  }
}
