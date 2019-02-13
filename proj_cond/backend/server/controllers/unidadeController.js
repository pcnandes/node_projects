const persist = require('../persist/unidadePersist')
const { onSuccess } = require('./../api/responses/successHandler')
const { onError } = require('./../api/responses/errorHandler')

exports.salvar = async function (req, res) {
  try {
    console.log('unidadeeee', req.body)
    const retorno = await persist.alterar(req.body)
    return onSuccess(res, retorno)
  } catch (err) {
    return onError(res, 'Erro ao cadastrar condominio', err)
  }
}

exports.listar = async function (req, res) {
  try {
    let retorno = await persist.listar()
    return onSuccess(res, retorno)
  } catch (err) {
    return onError(res, 'Erro ao listar os condomínios', err)
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
    return onError(res, 'Erro ao carregar o condomínio', err)
  }
}
