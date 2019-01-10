function getBlocoNew () {
  return {id: '', nome: '', unidades: [], condominio: {}}
}

function getCondominioNew () {
  return {id: '', nome: '', blocos: []}
}

export { getBlocoNew, getCondominioNew }
