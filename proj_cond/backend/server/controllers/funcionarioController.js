const persist = require('../persist/funcionarioPersist')
const { onError } = require('./../api/responses/errorHandler')
const { onSuccess } = require('./../api/responses/successHandler')

exports.novo = async function (req, res) {
  try {
    const retorno = await persist.cadastrar(req.body)
    return onSuccess(res, retorno)
  } catch (err) {
    return onError(res, 'Erro ao cadastrar funcionaário', err)
  }
}

exports.salvar = async function (req, res) {
  try {
    const retorno = await persist.alterar(req.body)
    return onSuccess(res, retorno)
  } catch (err) {
    return onError(res, 'Erro ao cadastrar funcionário', err)
  }
}

exports.listar = async function (req, res) {
  try {
    let retorno = await persist.listar()
    return onSuccess(res, retorno)
  } catch (err) {
    return onError(res, 'Erro ao listar os funcionário', err)
  }
}

exports.listarCondominio = async function (req, res) {
  try {
    let id = req.params.id
    let retorno = await persist.listarCondominio(id)
    return onSuccess(res, retorno)
  } catch (err) {
    return onError(res, 'Erro ao listar os funcionário', err)
  }
}

exports.carregar = async function (req, res) {
  try {
    let id = req.params.id
    if (id) {
      let retorno = await persist.carregar(id)
      return onSuccess(res, retorno)
    } else res.status(500).send({ data: null, message: 'Id nao informado', erro: null })
  } catch (err) {
    return onError(res, 'Erro ao carregar o funcionário', err)
  }
}
