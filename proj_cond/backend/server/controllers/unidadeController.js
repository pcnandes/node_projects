const persist = require('../persist/unidadePersist')
const { onSuccess } = require('./../api/responses/successHandler')
const { onError } = require('./../api/responses/errorHandler')
const { possuiPerfis, getUsuarioLogado } = require('./usuarioController')

// Verificar permissao igual ao carregar
exports.salvar = async function (req, res) {
  try {
    let idUnidade = parseInt(req.body.id)
    if (!usuarioPossuiPermissao(idUnidade)) {
      return onError(res, 'Usuário não possui permissão para salvar essa unidade', null)
    } else {
      const retorno = await persist.alterar(req.body)
      return onSuccess(res, retorno)
    }
  } catch (err) {
    return onError(res, 'Erro ao cadastrar unidade', err)
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
    let id = parseInt(req.params.id)
    if (id) {
      if (!usuarioPossuiPermissao(id)) {
        return onError(res, 'Usuário não possui permissão para acessar essa unidade', null)
      } else {
        let retorno = await persist.carregar(id)
        return onSuccess(res, retorno)
      }
    } else res.status(500).send({ data: null, message: 'Id nao informado', erro: null })
  } catch (err) {
    return onError(res, 'Erro ao carregar o usuario', err)
  }
}

function usuarioPossuiPermissao (idUnidade) {
  if (!idUnidade) return false
  else if (possuiPerfis(['ADMIN', 'SINDICO'])) return true
  else {
    let usuario = getUsuarioLogado()
    if (possuiPerfis(['MORADOR']) && usuario && usuario.unidade_id === idUnidade) return true
  }
  return false
}
