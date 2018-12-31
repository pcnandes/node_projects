// https://markus.oberlehner.net/blog/vue-form-validation-with-vuelidate/
/* class Andar {
  constructor (andar, unidades) {
    this.andar = andar
    this.unidades = unidades
  }
} */
class Unidade {
  constructor () {
    this.andar = ''
    this.nome = ''
  }
}
class Bloco {
  constructor () {
    this.nome = ''
    // this.numeroPrimeiraUnidade = ''
    // this.andares = ''
    // this.unidadesPorAndar = ''
    // this.andar = [] // ex[{ andar: 1, unidades: [] }]
    this.unidades = []
  }
}
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
  constructor (id = null, nome = '', blocos = []) {
    this.id = id
    this.nome = nome
    this.blocos = blocos
  }
}

export { AreaComum, Garagem, Condominio, Bloco, Unidade }
