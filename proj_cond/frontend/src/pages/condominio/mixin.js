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
    this.numeroPrimeiraUnidade = ''
    this.andares = ''
    this.unidadesPorAndar = ''
    this.andar = [] // ex[{ andar: 1, unidades: [] }]
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

function condominioBackToFront (condominio) {
  console.log('condominioBackToFront')
  condominio.blocos = condominio.blocos.map(bloco => {
    let _bloco = []
    let andar = []
    for (let i = 0; i < bloco.unidades.length; i++) {
      if (andar.length === 0) {
        andar.push(bloco.unidades[i])
        // verifico se estou no mesmo andar
      } else if (andar[andar.length - 1].andar === bloco.unidades[i].andar) {
        andar.push(bloco.unidades[i])
      // se mudou o andar
      } else {
        _bloco.push(andar)
        andar = []
        andar.push(bloco.unidades[i])
      }
    }
    _bloco.push(andar)
    return _bloco
  })
  return condominio
}

function condominioToBackend (condominio) {
  let retorno = JSON.parse(JSON.stringify(condominio))
  retorno.blocos.map(bloco => {
    let bl = {}
    bl.nome = bloco.nome
    let unidades = []
    bloco.andar.forEach(andar => {
      unidades = andar.unidades.map(unidade => {
        return {id: unidade.id, nome: unidade.nome, 'andar': andar.andar}
      })
    })
    bl.unidades = unidades
    return bl
  })
  return retorno
}

export { AreaComum, Garagem, Condominio, Bloco, Unidade, condominioToBackend, condominioBackToFront }
