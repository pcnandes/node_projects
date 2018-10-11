import store from './store';
import { date } from 'quasar';
import { TIPO_DADO } from './const';

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

/**
 * Exibe um alerta na aplicação
 * @param {*} message Mensagem a ser apresentada
 * @param {*} color Cor do alerta
 * @param {*} icon Ícone do alerta
 * @param {*} timeout Timeout do alerta
 */
function mostrarAlerta (message, color, icon, timeout) {
  store.dispatch('alert/add', {icon, color, message, timeout})
}

/**
 * Obtém o usuário logado
 */
function loggedUser () {
  return store.getters['auth/user'];
}

/**
 * Verifica se o usuário possui algum perfil
 * @param {*} roles Perfis a serem verificados
 */
function hasRole (roles) {
  return store.getters['auth/hasRole'](roles);
}

/**
 * Formata valores do tipo Data, Hora, Moeda, etc.
 * @param {*} valor Valor a ser formatado
 * @param {*} tipo Date, Time, Moeda
 * @param {*} formato String que representa do formato a ser usado
 */
function formatarValores (valor, tipo, formato) {
  let valFormatado = '';
  switch (tipo) {
    case TIPO_DADO.DATE:
      valFormatado = date.formatDate(valor, !formato ? 'DD/MM/YYYY' : formato);
      break;
    case TIPO_DADO.TIMESTAMP:
      valFormatado = date.formatDate(valor, !formato ? 'DD/MM/YYYY HH:mm:ss' : formato);
      break;
    default:
      valFormatado = valor;
  }
  return valFormatado;
}

export { regexAcentuacao, mostrarAlerta, loggedUser, hasRole, formatarValores }
