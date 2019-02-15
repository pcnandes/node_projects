import { TIPO_MORADOR } from '../../const'

function getBlocoNew () {
  return {id: null, nome: '', unidades: [], condominio: {}}
}

function getCondominioNew () {
  return {id: null, nome: '', blocos: [], situacao: 'NÃO SALVO'}
}

function getMoradorNew () {
  return {id: null, nome: '', tipo: TIPO_MORADOR.MORADOR, email: null, telefone: null, celular1: null, celular2: null, responsavel: false, enviarNotificacaoEmail: false, dataDesativacao: null, dataCriacao: null}
}

export { getBlocoNew, getCondominioNew, getMoradorNew }
