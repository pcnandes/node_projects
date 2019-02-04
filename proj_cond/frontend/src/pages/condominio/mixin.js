import { TIPO_MORADOR } from '../../const'

function getBlocoNew () {
  return {id: null, nome: '', unidades: [], condominio: {}}
}

function getCondominioNew () {
  return {id: null, nome: '', blocos: [], situacao: 'NÃO SALVO'}
}

function getUnidadeNew () {
  return {id: null, nome: '', tipo: TIPO_MORADOR.MORADOR, email: '', telefone: '', celular1: '', celular2: '', ehResponsavelUnidade: false, recebeNotificacaoEmail: false}
}

export { getBlocoNew, getCondominioNew, getUnidadeNew }
