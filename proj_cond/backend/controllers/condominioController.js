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
    return res.status(400).send({ data: null, message: 'Erro ao cadastrar condominio', erro: err })
  }
}
