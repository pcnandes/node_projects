<template>
  <div>
    <q-select v-model="model.type" :options="tiposExibicao" float-label="Tipo de Exibição"></q-select>
    <p/>
    <component :is="componenteExibicao" :model="model" :esquema="esquema"></component>
  </div>
</template>

<script>
import ExibicaoTabela from './ExibicaoTabela.vue'
import { EXIBICAO } from '../../../const'
import { QSelect, QField } from 'quasar'

export default {
  components: {
    QSelect, QField,
    ExibicaoTabela
  },
  props: {
    model: Object,
    esquema: Object
  },
  data () {
    return {
    }
  },
  computed: {
    componenteExibicao () {
      switch (this.model.type) {
        case 'tabela': return 'ExibicaoTabela'
      }
    },
    tiposExibicao () {
      return Object.keys(EXIBICAO).map(field => {
        return {
          value: field,
          label: EXIBICAO[field]
        }
      })
    }
  },
  methods: {
  },
  created () {
    console.log(this.model);
  }
}
</script>

<style>

</style>
