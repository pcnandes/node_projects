
class AreaComum {
  constructor () {
    this.titulo = ''
    this.descricao = ''
    this.agenda = '' /* ver melhor forma de implementar..
    ex. periodicidade[semanal, mensal, anual]
      semanal -> exibir agenda de uma semana onde para cada dia é dada a opção de horario inicio e fim
      mensal -> dentro de um mes, para cada dia é possivel definir horario de inicio e fim
      anual -> exibe ano inteiro e para cada dia é possivel definir horario de inicio e fim
      ** permitir criar um horario de inicio e fim padrao
      */
  }
}
class Garagem {
  constructor () {
    this.identificacao = ''
    this.usuario = '' // opcional que vai guardar a unidade responsável
  }
}
class Condominio {
  constructor () {
    this.nome = ''
    this.blocos = []
  }
}
export { AreaComum, Garagem, Condominio }
