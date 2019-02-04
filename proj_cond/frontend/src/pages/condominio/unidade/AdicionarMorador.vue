<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss ref="modalRef"
    :content-css="{minWidth: isMobile?'100vw':'650px', maxWidth: isMobile?'100vw':'60vw'}" :maximized="isMobile">
    <div class="doc-container justify-center gutter-y-sm" style="padding: 20px;">
        <div class="row justify-center q-display-1">
          Cadastro de Morador
        </div>
        <q-field class="col-12" icon="mdi-arrow-decision">
          <q-select v-model="morador.tipo" float-label="Tipo" :options="tiposMorador"
            @blur="$v.morador.tipo.$touch" :error="$v.morador.tipo.$error"
          />
        </q-field>
        <q-field class="col-12" icon="mdi-account">
          <q-input v-model="morador.nome" float-label="Nome"
            @blur="$v.morador.nome.$touch" :error="$v.morador.nome.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-calendar">
          <q-datetime v-model="morador.nascimento" type="date" float-label="Nascimento"
            @blur="$v.morador.nascimento.$touch" :error="$v.morador.nascimento.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-email">
          <q-input v-model="morador.email" type="email" float-label="email"
            @blur="$v.morador.email.$touch" :error="$v.morador.email.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-phone">
          <q-input v-model="morador.telefone" type="tel" float-label="Telefone"
            v-mask="'(##) ####-####'" placeholder="(99) 9999-9999"
            @blur="$v.morador.telefone.$touch" :error="$v.morador.telefone.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-cellphone">
          <q-input v-model="morador.celular1" type="tel" float-label="Celular 1"
            v-mask="'(##) #####-####'" placeholder="(99) 99999-9999"
            @blur="$v.morador.celular1.$touch" :error="$v.morador.celular1.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-cellphone">
          <q-input v-model="morador.celular2" type="tel" float-label="Celular 2"
            :mask="'(##) #####-####'" placeholder="(99) 99999-9999"
            @blur="$v.morador.celular2.$touch" :error="$v.morador.celular2.$error"/>
        </q-field>
        <q-field class="col-12">
          <q-checkbox v-model="morador.ehResponsavelUnidade" label="Este morador é responsável pela unidade." />
        </q-field>
        <q-field class="col-12">
          <q-checkbox v-model="morador.recebeNotificacaoEmail" label="Enviar notificações por email para esse usuário." />
        </q-field>
        <div class="barra-botoes">
          <q-btn class="col-xs-12" color="faded" @click="cancelar()" label="Cancelar" />
          <q-btn class="col-xs-12" color="primary" @click="confirmar()" label="Confirmar" />
        </div>
    </div>
  </q-modal>
</template>

<script>
import { QBtn, QField, QInput, QModal, QSelect, QDatetime, QCheckbox } from 'quasar'
import { required, email, numeric } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'
import { TIPO_MORADOR } from '../../../const'
import { getUnidadeNew } from '../mixin.js'

export default {
  components: {
    QBtn, QField, QInput, QModal, QSelect, QDatetime, QCheckbox, mask
  },
  data () {
    return {
      morador: getUnidadeNew(),
      tiposMorador: [
        {label: TIPO_MORADOR.MORADOR, value: [TIPO_MORADOR.MORADOR]},
        {label: TIPO_MORADOR.LOCADOR, value: [TIPO_MORADOR.LOCADOR]},
        {label: TIPO_MORADOR.LOCATARIO, value: [TIPO_MORADOR.LOCATARIO]}],
      promiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  validations: {
    morador: {
      tipo: { required },
      nome: { required },
      nascimento: { required },
      email: {email},
      telefone: {numeric},
      celular1: {numeric},
      celular2: {numeric}
    }
  },
  methods: {
    async prepararInclusao () {
      this.$v.morador.$reset()
      this.modo = 'INCLUSAO'
      await this.$refs.modalRef.show()
      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve
        this.promiseReject = reject
      })
    },
    async prepararAlteracao (objAlt) {
      try {
        this.$v.morador.$reset()
        this.morador = JSON.parse(JSON.stringify(objAlt))
        this.modo = 'ALTERACAO'
        await this.$refs.modalRef.show()
        return new Promise((resolve, reject) => {
          this.promiseResolve = resolve
          this.promiseReject = reject
        })
      } catch (error) {
        return new Promise((resolve, reject) => reject(new Error()))
      }
    },
    cancelar () {
      this.$refs.modalRef.hide()
    },
    confirmar () {
      this.$v.morador.$touch()
      if (this.$v.morador.$error) {
        this.$q.notify('Preencha as informações do obrigatórias e clique em confirmar.')
      } else {
        if (this.modo === 'ALTERACAO') {
          this.promiseResolve(this.morador)
        } else if (this.modo === 'INCLUSAO') {
          this.promiseResolve(this.morador)
        }
        this.$refs.modalRef.hide()
      }
    }
  }
}
</script>
<style scoped>
  .divUnidade {
    position:relative;
    border: 1px solid #5a5a5a;
    min-width: 60px!important;
    max-width: 88px!important;
    margin-bottom: 5px;
    margin-right: 5px;
    text-align: center;
    float: left;
  }
  .botaoExcluirUnidade {
    position:absolute; top:0; right:0;
    margin:0;
  }
  .clear {
    clear: left;
  }
</style>
