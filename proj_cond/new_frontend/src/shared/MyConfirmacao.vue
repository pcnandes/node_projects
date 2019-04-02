<template>
  <q-dialog persistent ref="modalConfirmacao">
    <q-card style="min-width: 400px;" class="bg-grey-4">
      <q-bar dark class="bg-warning text-white" style="height: 40px">
        <q-icon name="mdi-alert" size="30px"/>
        <div class="col text-center text-weight-bold">{{titulo}}</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup size="14px">
          <q-tooltip>Fechar / Cancelar</q-tooltip>
        </q-btn>
      </q-bar>
      <div style="margin: 20px;">
        <strong>{{texto}}</strong>
        <div class="barra-botoes">
          <q-btn color="grey-14" @click="cancelar()" label="Cancelar" size="17px" />
          <q-btn color="primary" @click="confirmarAcao()" label="Confirmar" size="17px" />
        </div>
      </div>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'my-confirmacao',
  props: {
    texto: { type: String, required: false, default: 'Confirma Exclusão?' },
    titulo: { type: String, required: false, default: 'Atenção' }
  },
  data () {
    return {
    }
  },
  methods: {
    confirmarAcao () {
      this.$emit('confirmar')
      this.$refs.modalConfirmacao.hide()
    },
    cancelar () {
      this.$refs.modalConfirmacao.hide()
    },
    show () {
      this.$refs.modalConfirmacao.show()
    }
  }
}
</script>
<style scoped>
</style>
