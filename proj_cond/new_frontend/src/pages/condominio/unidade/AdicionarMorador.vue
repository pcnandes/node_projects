<template>
  <q-dialog persistent ref="modalRef" :maximized="isMobile">
    <q-card style="minWidth: 650px" class="bg-grey-4">
      <q-bar dark class="bg-primary text-white" style="height: 40px">
        <q-icon name="mdi-worker" size="30px"/>
        <div class="col text-center text-weight-bold">Cadastro de Morador</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup size="14px">
          <q-tooltip>Fechar / Cancelar</q-tooltip>
        </q-btn>
      </q-bar>
      <q-form ref="formColaborador" class="doc-container justify-center gutter-y-sm row" style="padding: 20px;">
        <my-select ref="tipo" v-model="morador.tipo" :disable="modo==='DETALHE'"
          :options="tiposMorador" label="Tipo" required emit-value
          class="col-xs-12 col-md-6" icon="mdi-arrow-decision" />
        <my-input-text ref="nome" v-model.trim="morador.nome" :disable="modo==='DETALHE'"
            counter max-length="50" label="Nome" autofocus required
            class="col-12"/>
        <my-input-data ref="nascimento" v-model.trim="morador.nascimento"
          required class="col-xs-12 col-md-6" label="Inicio Atividade" :disable="modo==='DETALHE'"/>
        <!-- <q-field class="col-12" icon="mdi-arrow-decision">
          <q-select v-model="morador.tipo" float-label="Tipo" :options="tiposMorador" :disable="modo==='DETALHE'"
            @blur="$v.morador.tipo.$touch" :error="$v.morador.tipo.$error"
          />
        </q-field>
        <q-field class="col-12" icon="mdi-account">
          <q-input v-model="morador.nome" float-label="Nome" :disable="modo==='DETALHE'"
            @blur="$v.morador.nome.$touch" :error="$v.morador.nome.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-calendar">
          <q-datetime v-model="morador.nascimento" type="date" float-label="Nascimento" :disable="modo==='DETALHE'"
            min="1900-12-31" :max="Date.now()" default-view="year" clearable/>
        </q-field>
        <q-field class="col-12" icon="mdi-email">
          <q-input v-model="morador.email" type="email" float-label="email" :disable="modo==='DETALHE'"
            @blur="$v.morador.email.$touch" :error="$v.morador.email.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-phone">
          <q-input v-model="morador.telefone" type="tel" float-label="Telefone" :disable="modo==='DETALHE'"
            v-mask="'(##) ####-####'" placeholder="(99) 9999-9999"
            @blur="$v.morador.telefone.$touch" :error="$v.morador.telefone.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-cellphone">
          <q-input v-model="morador.celular1" type="tel" float-label="Celular 1" :disable="modo==='DETALHE'"
            v-mask="'(##) #####-####'" placeholder="(99) 99999-9999"
            @blur="$v.morador.celular1.$touch" :error="$v.morador.celular1.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-cellphone">
          <q-input type="tel" float-label="Celular 2" v-model="morador.celular2" :disable="modo==='DETALHE'"
            v-mask="'(##) #####-####'" placeholder="(99) 99999-9999"
            @blur="$v.morador.celular2.$touch" :error="$v.morador.celular2.$error"/>
        </q-field>
        <q-field class="col-12">
          <q-checkbox v-model="morador.responsavel" label="Este morador é responsável pela unidade."
            :disable="modo==='DETALHE'" />
        </q-field>
        <q-field class="col-12" v-if="!$v.morador.email.$invalid && this.morador.email">
          <q-checkbox v-model="morador.enviarNotificacaoEmail" label="Enviar notificações por email para esse usuário."
          :disable="modo==='DETALHE'" />
        </q-field> -->
        <div class="barra-botoes">
          <q-btn class="col-xs-12" color="grey-14" @click="cancelar()" label="Cancelar" size="17px" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="negative" @click="excluir()" label="Excluir"  size="17px" v-if="modo==='ALTERACAO'"/>
          <q-btn class="col-xs-12" color="primary" @click="confirmar()" label="Confirmar" size="17px" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="grey-14" @click="cancelar()" label="Fechar" size="17px" v-if="modo==='DETALHE'"/>
        </div>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
// import { QBtn, QField, QInput, QModal, QSelect, QDatetime, QCheckbox } from 'quasar'
// import { required, email, helpers } from 'vuelidate/lib/validators'
// import { mask } from 'vue-the-mask'
import MySelect from '../../../shared/MySelect'
import MyInputText from '../../../shared/MyInputText'
import MyInputData from '../../../shared/MyInputData'
import { TIPO_MORADOR } from '../../../const'
import { Morador } from '../mixin.js'

// const telefone = helpers.regex('alpha', /^\([1-9]{2}\) [2-9][0-9]{3,4}-[0-9]{4}$/)

export default {
  components: { MySelect, MyInputText, MyInputData
    // QBtn, QField, QInput, QModal, QSelect, QDatetime, QCheckbox
  },
  // directives: {mask},
  data () {
    return {
      morador: new Morador(),
      tiposMorador: this.carregarValoresCombo(TIPO_MORADOR),
      promiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  /* validations: {
    morador: {
      tipo: { required },
      nome: { required },
      email: {email},
      telefone: {telefone},
      celular1: {telefone},
      celular2: {telefone}
    }
  }, */
  methods: {
    async prepararInclusao () {
      // this.$v.morador.$reset()
      this.morador = new Morador()
      this.modo = 'INCLUSAO'
      await this.$refs.modalRef.show()
      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve
        this.promiseReject = reject
      })
    },
    async prepararAlteracao (objAlt) {
      try {
        // this.$v.morador.$reset()
        this.morador = JSON.parse(JSON.stringify(objAlt))
        this.modo = !this.morador.dataExclusao && this.possuiPerfis(['ADMIN', 'SINDICO', 'MORADOR']) ? 'ALTERACAO' : 'DETALHE'
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
      this.promiseReject()
    },
    confirmar () {
      /* this.$v.morador.$touch()
      if (this.$v.morador.email.$invalid) {
        this.$q.notify('Informe um email vádido!')
      }
      if (this.morador.enviarNotificacaoEmail && (this.$v.morador.email.$invalid || !this.morador.email)) {
        this.$q.notify('Informe um email vádido para que o empregado possa receber notificações por email!')
      }
      if (this.$v.morador.$error) { */
      let erro = true
      if (erro) {
        this.$q.notify('Preencha as informações do obrigatórias e clique em confirmar.')
      } else {
        this.promiseResolve(this.morador)
        this.$refs.modalRef.hide()
      }
    },
    excluir () {
      if (this.morador.id) {
        this.morador.dataExclusao = new Date()
        this.promiseResolve(this.morador)
      } else {
        this.promiseResolve(null)
      }
      this.$refs.modalRef.hide()
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
