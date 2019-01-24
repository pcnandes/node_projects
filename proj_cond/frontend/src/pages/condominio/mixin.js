function getBlocoNew () {
  return {id: '', nome: '', unidades: [], condominio: {}}
}

function getCondominioNew () {
  return {id: '', nome: '', blocos: [], situacao: 'NÃO SALVO'}
}

export { getBlocoNew, getCondominioNew }
