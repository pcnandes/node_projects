import { TIPO_MORADOR } from '../../const'

function getBlocoNew () {
  return {id: null, nome: '', unidades: [], condominio: {}}
}

function getCondominioNew () {
  return {id: null, nome: '', blocos: [], situacao: 'NÃO SALVO'}
}

function getMoradorNew () {
  return {id: null, nome: '', tipo: TIPO_MORADOR.MORADOR, email: '', telefone: '', celular1: '', celular2: '', responsavel: false, enviarNotificacaoEmail: false, dataDesativacao: null, dataCriacao: null}
}

export { getBlocoNew, getCondominioNew, getMoradorNew }
