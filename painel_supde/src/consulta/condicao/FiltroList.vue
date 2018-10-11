<template>
  <div>
  <q-modal ref="modal" :content-css="{minWidth: '80vw', minHeight: '80vh'}">
    <q-modal-layout>
      <q-toolbar slot="header">
        <q-btn flat round small @click="$refs.modal.close()">
          <q-icon name="fa-close" />
        </q-btn>
        <div class="q-toolbar-title">
          Incluir filtros
        </div>
        <q-chip v-if="selecionados.length > 0" color="dark" small>{{selecionados.length}}</q-chip>
      </q-toolbar>
      <q-toolbar slot="header">
        <q-search :autofocus="true" placeholder="Buscar" inverted v-model="search" color="none" :debounce="500"/>
      </q-toolbar>
      <div slot="footer" style="text-align: center; padding: 1em">
        <q-btn color="primary" @click="confirma()" :disable="selecionados.length === 0">
          Confirma
        </q-btn>
      </div>
      <div class="layout-padding">
        <q-list link no-border>
          <q-item tag="label" multiline v-for="(filtro,index) in lista" :key="index">
            <q-item-side>
              <q-checkbox v-model="selecionados" :val="filtro.nome"></q-checkbox>
            </q-item-side>
            <q-item-main>
              <q-item-tile label>{{filtro.titulo}}</q-item-tile>
              <q-item-tile sublabel v-if="filtro.descricao">{{filtro.descricao}}</q-item-tile>
            </q-item-main>
          </q-item>
        </q-list>
      </div>
    </q-modal-layout>
  </q-modal>
  </div>
</template>

<script>
import { QModal, QModalLayout, QToolbar, QIcon, QSearch, QList, QItem, QItemMain, QItemTile, QItemSide, QChip, QBtn, QCheckbox } from 'quasar'
import { regexAcentuacao } from '../../utils.js'

export default {
  components: {
    QModal, QModalLayout, QToolbar, QIcon, QSearch, QList, QItem, QItemMain, QItemTile, QItemSide, QChip, QBtn, QCheckbox
  },
  props: {
    filtros: Array
  },
  data () {
    return {
      search: '',
      selecionados: []
    }
  },
  computed: {
    /**
     * obtém a lista de filtros aplicando a busca
     */
    lista () {
      if (this.search && this.search.length > 0) {
        const regex = regexAcentuacao(this.search);
        return this.filtros.filter(x => x.titulo.match(regex));
      }
      return this.filtros;
    }
  },
  methods: {
    show () {
      this.search = '';
      this.selecionados = [];
      this.$refs.modal.open();
    },
    confirma () {
      this.$refs.modal.close();
      this.$emit('change', this.selecionados);
    }
  }
}
</script>

<style>

</style>
