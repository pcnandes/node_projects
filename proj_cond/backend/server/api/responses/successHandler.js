const HTTPStatus = require('http-status')

exports.onSuccess = function (res, data) {
  res.status(HTTPStatus.OK).json(data)
}
