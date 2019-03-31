<template>
  <div class="barra-botoes-crud row justify-between bg-grey-5">
    <div class="row items-center">
      <q-btn icon="mdi-arrow-left"
        v-if="exibeCancelar"
        :fab-mini="$q.screen.lt.sm" flat
        :label="labelCancelar" color="primary"
        :title="titleCancelar"
        @click="voltar()"/>
        <div class="titulo" v-if="!!titulo">
          {{titulo}}
        </div>
    </div>
    <div>
      <q-btn class="q-ml-sm"
        v-if="exibeExcluir"
        :fab-mini="$q.screen.lt.sm" flat
        icon="mdi-close" :label="labelExcluir" color="negative"
        :title="titleExcluir"
        @click="confirmaExclusao()"/>
      <q-btn class="q-ml-sm"
        v-if="exibeConfirmar"
        :fab-mini="$q.screen.lt.sm" flat
        icon="mdi-check"
        :label="labelConfirmar" color="primary"
        :title="labelConfirmar"
        @click="confirmar()"/>
    </div>
    <my-confirmacao ref="confirmaExclusao" @click="excluir()"></my-confirmacao>
  </div>
</template>

<script>
import MyConfirmacao from './MyConfirmacao'

export default {
  name: 'Botoes_Crud',
  components: { 'my-confirmacao': MyConfirmacao },
  props: {
    exibeCancelar: { type: Boolean, default: true },
    labelCancelar: { type: String, default: 'Voltar' },
    titleCancelar: { type: String, default: 'Voltar' },
    exibeConfirmar: { type: Boolean, default: true },
    labelConfirmar: { type: String, default: 'Confirmar' },
    titleConfirmar: { type: String, default: 'Confirmar' },
    exibeExcluir: { type: Boolean, default: true },
    labelExcluir: { type: String, default: 'Excluir' },
    titleExcluir: { type: String, default: 'Excluir' },
    titulo: { type: String }
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
    },
    confirmaExclusao () {
      this.$refs.confirmaExclusao.show()
    }
  }
}
</script>
<style scoped>
  .titulo {
    color:hsl(212, 80%, 42%);
    font-weight: bold;
    border-left: solid;
    border-width: 1px;
    padding-left: 20px;
  }
  .barra-botoes-crud {
    /* background-color: #b0bec5; */
    margin-top: -20px;
    margin-left: -20px;
    margin-right: -20px;
    margin-bottom: 15px;
    padding: 5px;
    /* flutuar
    position: absolute;
    bottom: 0;
    width: 100%;*/
  }

  @media (max-width: 575px) {
    .titulo {
      border:none;
    }
  }
</style>
