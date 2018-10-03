<template>
  <div>
    <div class="q-list-header">Total de resultados: {{facetasTotal}}</div>
    <q-list no-border link dense highlight v-for="(filtro, filtroIndex) in filtros" :key="filtro.tipo.label">
      <q-list-header>{{filtro.tipo.label}}</q-list-header>
      <q-item v-for="(item, itemIndex) in filtro.filtros" :key="item.id"
        :disabled="item.total==0"
        @click.native="filtrar(filtroIndex, itemIndex)"
        v-if="(filtrosSelecionados.length == 0 || filtrosSelecionados[filtroIndex]==null || filtrosSelecionados[filtroIndex]===itemIndex)">
        <q-item-main :label="item.label" />
        <q-item-side right>
          <span class="qtdPagina">({{item.total}})</span>
          <q-btn round color="red"
            flat size="xs"
            icon="cancel"
            @click.stop="retirarFiltro(filtroIndex, itemIndex)"
            v-if="(filtrosSelecionados.length >= 0 && filtrosSelecionados[filtroIndex]!=null && filtrosSelecionados[filtroIndex]===itemIndex)"/>
        </q-item-side>
      </q-item>
    </q-list>
  </div>
</template>

<script>
import { TIPO_FILTRO } from '../../const.js'
import { QChipsInput } from 'quasar'
import Vue from 'vue'

export default {
  components: {
    QChipsInput
  },
  data () {
    return {
      tipoFiltro: TIPO_FILTRO,
      // esse atributo irá armazenar as posições selecionados a partir do atributos this.filtros
      filtrosSelecionados: []
    }
  },
  methods: {
    // o método recebe as posições do filtro selecionado
    filtrar (filtroIndex, itemIndex) {
      // verifico se ja existe algo gravado para o tipo de filtro
      if (!this.filtrosSelecionados[filtroIndex]) {
        // adiciono as posições do filtro selecionado
        // Vue.set(this.filtrosSelecionados, filtroIndex, itemIndex)
        // this.filtrosSelecionados[filtroIndex] = itemIndex
        Vue.set(this.filtrosSelecionados, filtroIndex, itemIndex)
        this.tratarFiltro()
      }
    },
    retirarFiltro (filtroIndex, itemIndex) {
      this.filtrosSelecionados.splice(filtroIndex, 1)
      this.tratarFiltro()
    },
    // método responsável em montar os filtros selecionados
    tratarFiltro () {
      // monto o objeto que vai conter todos os filtros aplicados
      let filtrosAplicados = []
      // percorro a lista de filtro selecionados
      for (let i = 0; i < this.filtrosSelecionados.length; i++) {
        // se existe o filtro na posição
        if (!this.filtrosSelecionados[i]) {
          let filtro = {}
          // recupero o filtro na posição correspondente
          filtro.tipo = this.filtros[i].tipo
          filtro.filtros = []
          // recupero o item do filtro selecionado
          if (this.filtros[i].filtros && this.filtros[i].filtros[this.filtrosSelecionados[i]]) {
            filtro.filtros.push(this.filtros[i].filtros[this.filtrosSelecionados[i]])
          }
          filtrosAplicados.push(filtro)
        }
      }
      // chamo o método responsável por aplicar os filtros
      this.aplicarFiltro(filtrosAplicados)
    },
    aplicarFiltro (filtros) {
      console.log('filtrando')
      // let qParams = this.$route.query
      if (filtros && filtros.length > 0) {
        this.$root.$emit('aplicarFiltro', filtros)
      } else {
        this.$root.$emit('aplicarFiltro', null)
      }
    },
    retirarFiltroPagina () {
      this.paginaSelecionada = null
      this.filtrar(null)
    },
    retirarFiltroTipo () {
      this.tipoSelecionado = null
      this.fltrar(null)
    }
  },
  computed: {
    exibeMenuFacetas: {
      get () {
        return this.$store.state.example.exibeMenuFacetas
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
      }
    }
  }
}
</script>

<style scoped>
  .qtdPagina {
    font-size: 0.8rem;
    line-height: 0.8rem;
    white-space: nowrap;
    margin: 0.3rem 0;
}
</style>
