const HTTPStatus = require('http-status')
// api responsavel por capturar os erros da aplicação
module.exports = function (err, req, res, next) {
  console.error(`API error handler foi executada ${err}`)
  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).json({
    errorCode: 'ERR-001',
    message: 'Erro Interno do Servidor'
  })
}
