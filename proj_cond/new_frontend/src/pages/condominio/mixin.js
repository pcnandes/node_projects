function getCondominioNew () {
  return { id: undefined, nome: '', blocos: [], situacao: 'NÃO SALVO' }
}

function getBlocoNew () {
  return { id: undefined, nome: '', unidades: [], condominio: {} }
}

/* function getUnidadeNew () {
  return {id: undefined, nome: '', andar: undefined, bloco: undefined, usuario: undefined, moradores: [], veiculos: [], colaboradores: []}
} */

function getMoradorNew () {
  return { id: undefined, nome: '', tipo: 'MORADOR', email: undefined, telefone: undefined, celular1: undefined, celular2: undefined, responsavel: false, enviarNotificacaoEmail: false, dataCriacao: undefined, dataExclusao: undefined }
}

function getColaboradorNew () {
  return { id: undefined, nome: undefined, observacao: undefined, tipoDoc: 'RG', numeroDoc: undefined, dataInicio: undefined, dataFim: undefined }
}

function getVeiculoNew () {
  return { id: undefined, tipo: 'CARRO', marca: undefined, modelo: undefined, cor: undefined, placa: undefined, dataCriacao: undefined, dataExclusao: undefined }
}

export { getBlocoNew, getCondominioNew, getMoradorNew, getColaboradorNew, getVeiculoNew }
