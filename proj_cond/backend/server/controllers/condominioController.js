const persist = require('../persist/condominioPersist')
const { onError } = require('./../api/responses/errorHandler')
const { onSuccess } = require('./../api/responses/successHandler')

exports.novo = async function (req, res) {
  try {
    /*
    let cond = Condominio.build({ ...req.body })
    cond.setBlocos([Bloco.build({ ...req.body.blocos[0] })])

    let condominio = req.body
    console.log(condominio)

    const retorno = await Condominio.create({
      nome: condominio.nome
    }) */
    req.body.situacao = 'RASCUNHO'
    const retorno = await persist.cadastrar(req.body)
    // return res.status(200).send(retorno)
    return onSuccess(res, retorno)
  } catch (err) {
    // return res.status(400).send({ data: null, message: 'Erro ao cadastrar condominio', erro: err })
    return onError(res, 'Erro ao cadastrar condominio', err)
  }
}

exports.salvar = async function (req, res) {
  try {
    const retorno = await persist.alterar(req.body)
    // return res.res.sendStatus(200).send(retorno)
    return onSuccess(res, retorno)
  } catch (err) {
    // return res.status(400).send({ data: null, message: 'Erro ao cadastrar condominio', erro: err })
    return onError(res, 'Erro ao cadastrar condominio', err)
  }
}

exports.listar = async function (req, res) {
  try {
    // TODO INCLUIR WHERE PEGANDO OS CONDOMINIOS DO SINDICO OU TDS PARA O ADMINISTRADOR
    let retorno = await persist.listar()
    // return res.status(200).send(retorno)
    return onSuccess(res, retorno)
  } catch (err) {
    // res.status(500).send({ data: null, message: 'Erro ao listar os condomínios', erro: err })
    return onError(res, 'Erro ao listar os condomínios', err)
  }
}

exports.carregar = async function (req, res) {
  try {
    let id = req.params.id
    if (id) {
      let retorno = await persist.carregar(id)
      // return res.status(200).send(retorno)
      return onSuccess(res, retorno)
    } else res.status(500).send({ data: null, message: 'Id nao informado', erro: null })
  } catch (err) {
    // res.status(500).send({ data: null, message: 'Erro ao listar os condomínios', erro: err })
    return onError(res, 'Erro ao carregar o condomínio', err)
  }
}

exports.excluir = async function (req, res) {
  try {
    let id = req.params.id
    if (id) {
      let retorno = await persist.excluir(id)
      return onSuccess(res, retorno)
    } else res.status(500).send({ data: null, message: 'Id não informado', erro: null })
  } catch (err) {
    return onError(res, 'Erro ao carregar excluir o condomínio', err)
  }
}

exports.gerarContasUsuario = async function (req, res) {
  try {
    let condominio = req.body
    console.log('condominiooooo', condominio)
    if (condominio) {
      const retorno = await persist.gerarContasUsuario(condominio)
      return onSuccess(res, retorno)
    } else return res.status(500).send({ data: null, message: `Condomínio ${req.params.id} não encontrado`, erro: null })
  } catch (err) {
    return onError(res, 'Erro ao gerar contas de usuário', err)
  }
}
