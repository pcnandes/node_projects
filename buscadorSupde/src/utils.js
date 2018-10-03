
/**
 * Constrói uma expressão regular de busca por texto ignorando acentos
 * @param {string} valor Texto a ser transformado em expressão regular
  */
function regexAcentuacao (valor) {
  valor = valor.toLowerCase();
  valor = valor.replace(/[aãáàâ]/gi, '[aãáàâ]');
  valor = valor.replace(/[eẽéèê]/gi, '[eẽéèê]');
  valor = valor.replace(/[iĩíìî]/gi, '[iĩíìî]');
  valor = valor.replace(/[oõóòô]/gi, '[oõóòô]');
  valor = valor.replace(/[uũúùû]/gi, '[uũúùû]');
  valor = valor.replace(/[cç]/gi, '[cç]');
  return new RegExp(valor, 'gi');
}

export { regexAcentuacao }
