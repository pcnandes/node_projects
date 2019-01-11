<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss ref="modalRef"
    :content-css="{minWidth: '50vw', maxWidth: '80vw'}">
    <i class="material-icons light_gray absolute-top-right"
      title="Essa tela facilitará a criação de um bloco. Informe o 'Quantidade de andares' e 'Unidades por andar' para 'Gerar Bloco'. Caso a 'Primeira unidade' nao seja a 101, informe.">
      help
    </i>
    <div class="doc-container justify-center gutter-y-sm" style="padding: 20px;">
        <div class="row justify-center q-display-1">
          Cadastro Bloco
        </div>
        testeeee
        <div class="row justify-center gutter-sm">
          <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" color="faded" label="Cancelar" /></div>
          <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" color="primary" @click="fechar()" label="Confirmar" /></div>
        </div>
    </div>
  </q-modal>
</template>

<script>
import { QBtn, QField, QInput, QModal } from 'quasar'
// import { required } from 'vuelidate/lib/validators'
// import { getBlocoNew } from './mixin.js'

export default {
  components: {
    QBtn, QField, QInput, QModal
  },
  props: {

  },
  data () {
    return {
      retorno: null,
      teste: 'teste'
    }
  },
  methods: {
    async exibir () {
      this.teste = 'exibindoooo'
      this.retorno = await Promise.resolve(this.fechar)
      this.$refs.modalRef.show()
      return this.retorno
    },
    fechar () {
      this.$refs.modalRef.hide()
      console.log('resolve', this.retorno)
      console.log('teste', this.teste)
      return true
    }
  }
}
</script>
<style scoped>
</style>
