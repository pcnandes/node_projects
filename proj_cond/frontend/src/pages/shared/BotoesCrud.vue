<template>
  <div class="barra-botoes-crud row justify-between">
    <div class="botao-voltar">
      <q-btn icon="keyboard_arrow_left"
        :fab-mini="$q.screen.lt.sm" flat
        label="Voltar" color="primary"
        title="Voltar"/>
    </div>
    <div class="botoes-acao">
      <q-btn class="q-ml-sm"
        :fab-mini="$q.screen.lt.sm" flat
        icon="close" label="Excluir" color="negative"
        title="excluir"/>
      <q-btn class="q-ml-sm"
        :fab-mini="$q.screen.lt.sm" flat
        :icon="$q.screen.lt.sm ? 'keyboard_arrow_right' : ''" icon-right="keyboard_arrow_right"
        label="Confirmar" color="primary"
        title="Confirmar"/>
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
    acaoCancel: {type: Function},
    labelConfirmar: {type: String, default: 'Confirmar'},
    acaoConfirmar: {type: Function},
    labelExcluir: {type: String, default: 'Excluir'},
    acaoExcluir: {type: Function}
  },
  data () {
    return {
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
    margin-bottom: 10px;
    /* flutuar
    position: absolute;
    bottom: 0;
    width: 100%;*/
  }
</style>
