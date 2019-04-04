import { _maiorData } from '../../shared/funcoes'

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

class Morador {
  constructor (id, nome, tipo, email, telefone, celular1, celular2, responsavel, enviarNotificacaoEmail, dataCriacao, dataExclusao) {
    this.nome = ''
    this.tipo = 'MORADOR'
    this.email = undefined
    this.telefone = undefined
    this.celular1 = undefined
    this.celular2 = undefined
    this.responsavel = false
    this.enviarNotificacaoEmail = false
    this.dataCriacao = undefined
    dataExclusao = undefined
  }
}
function getColaboradorNew () {
  return { id: undefined, nome: undefined, observacao: undefined, tipoDoc: 'RG', numeroDoc: undefined, dataInicio: undefined, dataFim: undefined }
}

class Colaborador {
  constructor (id, nome, observacao, tipoDoc, numeroDoc, dataInicio, dataFim) {
    this.id = undefined
    this.nome = undefined
    this.observacao = undefined
    this.tipoDoc = 'RG'
    this.numeroDoc = undefined
    this.dataInicio = undefined
    this.dataFim = undefined
  }
  isAtivo () {
    console.log('aquiiiii', _maiorData(this.dataInicio, new Date()))
    if (!this.dataInicio || _maiorData(this.dataInicio, new Date())) {
      return false
    } else if (this.dataFim || _maiorData(new Date(), this.dataFim)) return true
    else return true
  }
}

function getVeiculoNew () {
  return { id: undefined, tipo: 'CARRO', marca: undefined, modelo: undefined, cor: undefined, placa: undefined, dataCriacao: undefined, dataExclusao: undefined }
}

export { getBlocoNew, getCondominioNew, getMoradorNew, getColaboradorNew, getVeiculoNew, Morador, Colaborador }
