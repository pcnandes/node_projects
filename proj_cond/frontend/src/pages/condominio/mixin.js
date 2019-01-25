function getBlocoNew () {
  return {id: null, nome: '', unidades: [], condominio: {}}
}

function getCondominioNew () {
  return {id: '', nome: '', blocos: [], situacao: 'NÃO SALVO'}
}

export { getBlocoNew, getCondominioNew }
