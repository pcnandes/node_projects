<template>
  <div class="border border-rounded border-primary" style="margin:4px;" v-if="model">
    <div class="bg-primary text-white header row">
      <a class="text-white row" title="Encolher" @click="toggle()" v-show="opened">
        <i class="fa fa-minus-circle self-center" />
      </a>
      <a class="text-white row" title="Expandir" @click="toggle()" v-show="!opened">
        <i class="fa fa-plus-circle self-center" />
      </a>
      <span>&nbsp;&nbsp;</span>
      <select v-model="model.operador" :disabled="model.obrigatorio">
        <option value="AND">AND - Tudo deve corresponder</option>
        <option value="OR">OR - Qualquer um pode corresponder</option>
      </select>
      <span>&nbsp;&nbsp;</span>
      <button type="button" title="Inclui grupo de filtro para combinações AND / OR" @click="incluirGrupo()">
        <i class="fa fa-object-group"/> Incluir grupo
      </button>
      <span class="flex">&nbsp;</span>
      <a v-if="nivel>0" @click="excluir()" class="text-white row" title="Excluir grupo de filtro">
        <i class="fa fa-close self-center" />
      </a>
    </div>
    <div v-show="opened">
      <div class="row items-stretch">
        <filtro v-for="item in items" :key="item.id" :condicao="item" :filtros="filtros" @removed="removerFilho"></filtro>
        <div style="padding:1em" v-if="filtros" class="row">
          <q-btn icon="fa-filter" @click="$refs.filtroList.show()" color="primary" class="self-center">Incluir filtro</q-btn>
          <filtro-list ref="filtroList" :filtros="filtros" @change="incluirFiltros"></filtro-list>
        </div>
      </div>
      <condicao v-for="item in grupos" :key="item.id" :model="item" :filtros="filtros" :bloqueado="false" :nivel="nivel+1" @removed="removerFilho"></condicao>
    </div>
  </div>
</template>

<script>
import { QSelect, QField, QBtn, QIcon } from 'quasar'
import Filtro from './Filtro'
import FiltroList from './FiltroList'

export default {
  name: 'condicao',
  components: {
    QSelect, QField, QBtn, QIcon,
    Filtro, FiltroList
  },
  props: {
    // nível hierárquico do grupo (zero = grupo raiz)
    nivel: {
      type: Number,
      default: 0
    },
    // objeto condicao
    model: Object,
    // lista de filtros disponíveis
    filtros: Array
  },
  data () {
    return {
      opened: true,
      sequence: 1
    }
  },
  computed: {
    /**
     * obtém os filtros do grupo
     */
    items () {
      if (this.model && this.model.filhos) {
        return this.model.filhos.filter(x => ['AND', 'OR'].indexOf(x.operador) < 0)
      }
      return [];
    },
    /**
     * obtém os subgrupos de filtro
     */
    grupos () {
      if (this.model && this.model.filhos) {
        return this.model.filhos.filter(x => ['AND', 'OR'].indexOf(x.operador) >= 0)
      }
      return [];
    }
  },
  methods: {
    /**
     * inclui um subgrupo de filtro
     */
    incluirGrupo () {
      if (!this.model.filhos) {
        this.model.filhos = [];
      }
      this.model.filhos.push({operador: 'AND', filhos: [], id: this.sequence++});
    },
    /**
     * inclui uma lista de filtros ao grupo de filtro
     */
    incluirFiltros (filtros) {
      if (filtros) {
        for (let i = 0; i < filtros.length; i++) {
          const filtro = this.filtros.filter(x => x.nome === filtros[i])[0];
          this.model.filhos.push({filtro: filtro.nome, id: this.sequence++});
        }
      }
    },
    /**
     * remove um filtro do grupo de filtros
     */
    removerFilho (item) {
      const idx = this.model.filhos.indexOf(item);
      this.model.filhos.splice(idx, 1);
    },
    /**
     * notifica evento de exclusão do grupo de filtro
     */
    excluir () {
      this.$emit('removed', this.model);
    },
    /**
     * abre/fecha o grupo de filtro
     */
    toggle () {
      this.opened = !this.opened;
    }
  },
  mounted () {
    if (this.model && this.model.filhos && this.model.filhos.length > 0) {
      this.sequence = this.model.filhos[this.model.filhos.length - 1].id + 1;
    }
  }
}
</script>

<style scoped>
  .header {
    padding: .2em;
  }
  .filtro-select {
    min-width: 10em;
    margin-left: 1em;
  }
</style>