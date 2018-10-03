<template>
  <q-page class="pagina" style="width: 100%;">
    <div class="blocoPesquisa">
      <h1 class="q-display-1 text-dark">Do que você precisa?</h1>
      <div class="row">
        <q-search
          @keyup.enter="pesquisar"
          class="filtroPesquisa"
          type="text"
          autofocus
          inverted
          color="grey-6"
          placeholder="Digite o que precisa pesquisar..."
          clearable
          v-model="pesquisa"
          :before="[{icon:''}]"
          :after="[
            {icon:''}
          ]"
        />
        <q-btn color="indigo-4" icon="search" title="Pesquisa Avançada"
          @click="pesquisar"/>
      </div>
    </div>
    <q-list no-border link inset-separator>
      <q-item v-for="item in resultado" :key="item.url" @click.native="openURL(item.url)">
        <q-item-main :label="item.titulo" :sublabel="item.url">
          <div v-for="e in item.encontrados" :key="e.id">
            <p class="subtituloResultado" ><span v-html="e.titulo"></span></p>
            <p class="subtituloResultado"><span v-html="e.conteudo"></span></p>
          </div>
        </q-item-main>
      </q-item>
    </q-list>
  </q-page>
</template>

<script>
import axios from 'axios'
import {openURL, Loading} from 'quasar'
import { TIPO_FILTRO, PAGINAS, TIPOS_ARQUIVO } from '../const'

export default {
  name: 'PagePesquisaAvancada',
  components: {
    openURL
  },
  data () {
    return {
      pesquisa: '',
      resultado: [],
      tipoFiltro: TIPO_FILTRO
    }
  },
  methods: {
    pesquisar (filtros) {
      console.log('pesquisar')
      if (!filtros) {
        if (this.pesquisa) {
          this.$router.push({path: 'resultado', query: {q: this.pesquisa}})
          this.executarPesquisa(null)
        }
      } else {
        // TODO montar rota
        this.executarPesquisa(filtros)
      }
    },
    executarPesquisa (filtros) {
      Loading.show()
      this.resultado = []
      let filtroFaceta = ''

      console.log('consultando')

      if (filtros) {
        for (let i = 0; i < filtros.length; i++) {
          // recupero o tipo e o id do filtro
          // para cada tipo só pode existir um filtro, por isso pego o da posicao [0]
          if (filtros[i] && filtros[i].tipo && filtros[i].tipo.tipo && filtros[i].filtros[0]) {
            filtroFaceta += `&fq=${filtros[i].tipo.tipo}:${filtros[i].filtros[0].id}`
          }
        }
        console.log(filtroFaceta)
      }

      axios.get('https://10.32.180.217:8983/solr/nutch/select?' +
        'defType=edismax' +
        '&facet.field=host' +
        '&facet.field=type' +
        '&facet=on' +
        '&fl=url,id,title' +
        filtroFaceta +
        '&facet.sort=index' +
        // '&fq=type:doc' + filtros de facetas
        '&hl.fl=conteudo,titulos' +
        '&hl.simple.post=%3C/hligh%3E' +
        '&hl.simple.pre=%3Chligh%3E' +
        '&hl=on' +
        '&indent=on' +
        '&mm=75%25' +
        '&ps=4' +
        '&q=' + this.pesquisa +
        '&qf=title^2%20titulos^1.2%20conteudo' +
        '&rows=100' +
        '&wt=json')
        .then(response => {
          // carrega o resultado
          console.log(response.data)
          if (response.data.response != null && response.data.response.docs.length > 0) {
            response.data.response.docs.map((item) => {
              let retorno = {}
              retorno.encontrados = []
              retorno.url = item.url
              retorno.titulo = item.title
              if (response.data.highlighting) {
                if (response.data.highlighting[item.id]) {
                  let faceta = {}
                  if (response.data.highlighting[item.id].titulos) {
                    faceta.titulo = '<style>hligh{color:red; font-style: italic;}</style>'
                    faceta.titulo += response.data.highlighting[item.id].titulos[0]
                  }
                  if (response.data.highlighting[item.id].conteudo) {
                    faceta.conteudo = response.data.highlighting[item.id].conteudo[0]
                  }
                  retorno.encontrados.push(faceta)
                }
              }
              this.resultado.push(retorno)
            })

            // this.facetaTipos = this.montarFaceta(response.data.facet_counts.facet_fields.type, TIPOS_ARQUIVO, TIPO_FILTRO.TIPO_DOC)
            // this.facetaPaginas = this.montarFaceta(response.data.facet_counts.facet_fields.host, PAGINAS, TIPO_FILTRO.PAGINA)
            let facetas = [{tipo: TIPO_FILTRO.PAGINA, faceta: response.data.facet_counts.facet_fields.host},
              {tipo: TIPO_FILTRO.TIPO_DOC, faceta: response.data.facet_counts.facet_fields.type}
            ]
            this.exibeMenuFacetas = true
            this.montarFaceta(facetas)
          } else {
            this.exibeMenuFacetas = false
          }
          Loading.hide()
        })
    },
    // reponsavel por montar uma nova faceta
    montarFaceta (facetas) {
      console.log(facetas)
      // let retorno = []
      let total = 0
      let _filtros = []

      for (let i = 0; i < facetas.length; i++) {
        total = 0
        // objeto q vai guardar o tipo da faceta e uma lista de faceta
        let faceta = {}
        // faceta.id = facetas[i]
        // faceta.tipo = tipo
        faceta.tipo = facetas[i].tipo
        let legendas = null
        // verifico o tipo de faceta retornado
        if (facetas[i].tipo === TIPO_FILTRO.PAGINA) {
          legendas = PAGINAS
        } else if (facetas[i].tipo === TIPO_FILTRO.TIPO_DOC) {
          legendas = TIPOS_ARQUIVO
        }
        faceta.filtros = []
        // percorro as facetas para mapear os labels
        for (let y = 0; y < facetas[i].faceta.length; y++) {
          let _filtro = {}
          _filtro.id = facetas[i].faceta[y]
          // _filtro.filtrado = false
          if (legendas[facetas[i].faceta[y]]) {
            _filtro.label = legendas[facetas[i].faceta[y]].label
            _filtro.sublabel = legendas[facetas[i].faceta[y]].sublabel
          // se nao tem label correspondente eu coloco o proprio id
          } else {
            _filtro.label = facetas[i].faceta[y]
            _filtro.sublabel = facetas[i].faceta[y]
          }
          // somo mais um no ponteiro pois o valor vem na posicao seguinte
          y++
          _filtro.total = facetas[i].faceta[y]
          // calculo o total geral
          total = total + _filtro.total
          faceta.filtros.push(_filtro)
        }
        _filtros.push(faceta)
      }
      // atualiza total geral
      // retorno[0].total = total
      this.facetasTotal = total
      this.filtros = _filtros
      console.log(_filtros)
    },

    // responsável por atualizar os dados da faceta
    atualizarFaceta (tipos, faceta) {
      tipos.map(f => {
        faceta[faceta.indexOf(f.id)] = f[1]
      })
    },

    openURL
  },
  mounted () {
    console.log('monted')
    console.log(this.pesquisa)
    if (this.$route.params.pesquisa) {
      this.pesquisa = this.$route.params.pesquisa
    }
    this.pesquisar()
  },
  created () {
    this.$root.$on('aplicarFiltro', (filtros) => this.pesquisar(filtros))
  },
  computed: {
    exibeMenuFacetas: {
      get () {
        return this.$store.state.example.exibeMenuFacetas
      },
      set (val) {
        this.$store.commit('example/setExibeMenuFacetas', val)
      }
    },
    filtros: {
      get () {
        return this.$store.state.example.filtros
      },
      set (val) {
        this.$store.commit('example/setFiltros', val)
      }
    },
    facetasTotal: {
      get () {
        return this.$store.state.example.facetasTotal
      },
      set (val) {
        this.$store.commit('example/setFacetasTotal', val)
      }
    }
  }
}
</script>

<style scoped>
  .subtituloResultado {
    font-size: 0.8em;
    /* color: rgb(29, 29, 29); */
    color: #757575;
    margin: 5px;
  }
  .filtrosPesquisa{
    margin-top: 10px;
  }
 .filtroPesquisa {
    flex-grow:1;
  }
</style>
