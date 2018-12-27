const HTTPStatus = require('http-status')

exports.onError = function (res, message, err) {
  console.error(`Error: ${err}`)
  res.status(HTTPStatus.INTERNAL_SERVER_ERROR).send({ message: message })
}

exports.onErrorNaoAutorizado = function (res, message) {
  res.status(HTTPStatus.UNAUTHORIZED).send({ auth: false, message: message })
}
