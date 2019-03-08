<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss ref="modalRef"
    :content-css="{minWidth: isMobile?'100vw':'650px', maxWidth: isMobile?'100vw':'60vw'}" :maximized="isMobile">
    <div class="doc-container justify-center gutter-y-sm" style="padding: 20px;">
        <div class="row justify-center q-display-1">
          Alterar Senha
        </div>
        <q-field class="col-12" icon="mdi-account">
          <password placeholder="informe a senha" secureLength="6"
            @blur="$v.colaborador.nome.$touch" :error="$v.colaborador.nome.$error"/>
        </q-field>
        <div class="barra-botoes">
          <q-btn class="col-xs-12" color="faded" @click="cancelar()" label="Cancelar" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="primary" @click="confirmar()" label="Confirmar" v-if="modo!=='DETALHE'"/>
        </div>
    </div>
  </q-modal>
</template>

<script>
// https://vuejsfeed.com/blog/vue-password-realistic-password-strength-estimator
// https://github.com/apertureless/vue-password-strength-meter?ref=madewithvuejs.com
import Password from 'vue-password-strength-meter'
import { QBtn, QField, QInput, QModal } from 'quasar'
import { required } from 'vuelidate/lib/validators'

export default {
  components: {
    QBtn, QField, QInput, QModal, Password
  },
  data () {
    return {
      novaSenha: null,
      repetirSenha: null,
      promiseResolve: null,
      promiseReject: null
    }
  },
  validations () {
    return {
      form: {
        novaSenha: { required },
        repetirSenha: { required }
      }
    }
  },
  methods: {
    async exibirTrocaSenha () {
      this.$v.form.$reset()
      await this.$refs.modalRef.show()
      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve
        this.promiseReject = reject
      })
    },
    cancelar () {
      this.$refs.modalRef.hide()
    },
    confirmar () {
      this.$v.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Preencha as informações do obrigatórias e clique em confirmar.')
      } else {
        this.promiseResolve(true)
        this.$refs.modalRef.hide()
      }
    }
  }
}
</script>

<style scoped>
</style>
