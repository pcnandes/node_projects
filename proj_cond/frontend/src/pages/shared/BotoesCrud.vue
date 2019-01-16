<template>
  <div class="barra-botoes-crud row justify-between">
    <div class="botao-voltar">
      <q-btn icon="keyboard_arrow_left"
        :fab-mini="$q.screen.lt.sm" flat
        :label="labelCancel" color="primary"
        :title="titleCancel"
        @click="voltar()"/>
    </div>
    <div class="botoes-acao">
      <q-btn class="q-ml-sm"
        :fab-mini="$q.screen.lt.sm" flat
        icon="delete" :label="labelExcluir" color="negative"
        :title="titleExcluir"
        @click="excluir()"/>
      <q-btn class="q-ml-sm"
        :fab-mini="$q.screen.lt.sm" flat
        :icon="$q.screen.lt.sm ? 'keyboard_arrow_right' : ''" icon-right="keyboard_arrow_right"
        :label="labelConfirmar" color="primary"
        :title="labelConfirmar"
        @click="confirmar()"/>
    </div>
  </div>
</template>

<script>
import { QBtn } from 'quasar'

export default {
  components: {
    QBtn
  },
  props: {
    labelCancel: {type: String, default: 'Voltar'},
    labelConfirmar: {type: String, default: 'Confirmar'},
    labelExcluir: {type: String, default: 'Excluir'},
    titleCancel: {type: String, default: 'Voltar'},
    titleConfirmar: {type: String, default: 'Confirmar'},
    titleExcluir: {type: String, default: 'Excluir'}
  },
  data () {
    return {
    }
  },
  methods: {
    voltar () {
      this.$emit('cancelar')
    },
    confirmar () {
      this.$emit('confirmar')
    },
    excluir () {
      this.$emit('excluir')
    }
  }
}
</script>
<style scoped>
  .barra-botoes-crud {
    background-color: rgb(221, 221, 221);
    margin-top: -20px;
    margin-left: -20px;
    margin-right: -20px;
    margin-bottom: 15px;
    padding-bottom: 5px;
    padding-top: 5px;
    /* flutuar
    position: absolute;
    bottom: 0;
    width: 100%;*/
  }
</style>
