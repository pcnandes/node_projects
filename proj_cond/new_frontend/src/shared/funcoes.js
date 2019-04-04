import { date } from 'quasar'
export function _formataData (data) {
  return data ? date.formatDate(data, 'DD/MM/YYYY') : null
}

export function _maiorData (dataIni, dataFim) {
  let diff = date.getDateDiff(dataIni, dataFim, 'days')
  console.log('entrou auiiiii', diff)
  return diff > 0
}

export function _maiorQueDataAtual (dataIni) {
  let diff = date.getDateDiff(dataIni, new Date(), 'days')
  return diff >= 0
}
