exports.capitalize = function (palavra) {
  if (typeof palavra !== 'string') return ''
  return palavra.charAt(0).toUpperCase() + palavra.slice(1)
}
