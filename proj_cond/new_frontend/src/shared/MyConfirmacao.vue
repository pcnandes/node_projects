<template>
  <q-dialog persistent ref="modalConfirmacao">
    <q-card style="min-width: 400px;">
      <q-card-section class="row items-center">
        <q-avatar icon="mdi-alert" color="primary" text-color="white" />
        <span class="q-ml-sm">{{texto}}</span>
      </q-card-section>

      <q-card-actions align="right">
        <q-btn label="Cancelar" color="negative" v-close-popup size="17px"/>
        <q-btn label="Confirmar" color="primary" v-close-popup @click="confirmarAcao()" size="17px"/>
      </q-card-actions>
    </q-card>
  </q-dialog>
</template>

<script>

export default {
  name: 'my-confirmacao',
  props: {
    texto: { type: String, required: false, default: 'Confirma Exclusão?' }
  },
  data () {
    return {
    }
  },
  methods: {
    confirmarAcao () {
      this.$emit('confirmar')
    },
    show () {
      this.$refs.modalConfirmacao.show()
    }
  }
}
</script>
<style scoped>
</style>
