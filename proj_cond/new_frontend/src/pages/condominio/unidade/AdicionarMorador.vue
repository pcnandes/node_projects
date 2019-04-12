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
      <my-form ref="form" class="doc-container justify-center gutter-y-sm row" style="padding: 20px;">
        <my-select ref="tipo" v-model="morador.tipo" :disable="modo==='DETALHE'"
          :options="tiposMorador" label="Tipo" required emit-value
          icon="mdi-arrow-decision" />
        <my-input-text ref="nome" v-model.trim="morador.nome" :disable="modo==='DETALHE'"
            counter max-length="50" label="Nome" autofocus required/>
        <my-input-email ref="email" v-model.trim="morador.email" :disable="modo==='DETALHE'"
            counter max-length="50" label="Email"/>
        <my-input-data ref="nascimento" v-model.trim="morador.nascimento"
          class="col-md-6" label="Nascimento" :disable="modo==='DETALHE'"
          min-date="1900-12-31" :max-date="Date.now()"/>
        <my-input-telefone ref="telefone" v-model.trim="morador.telefone" icon="mdi-phone"
          class="col-md-6" label="Telefone" :disable="modo==='DETALHE'"/>
        <my-input-telefone ref="celular1" v-model.trim="morador.celular1"
          class="col-md-6" label="Celular 1" :disable="modo==='DETALHE'"/>
        <my-input-telefone ref="celular2" v-model.trim="morador.celular2"
          class="col-md-6" label="Celular 2" :disable="modo==='DETALHE'"/>
        <q-checkbox v-model="morador.responsavel" label="Este morador é responsável pela unidade."
          :disable="modo==='DETALHE'"/>
        <q-checkbox v-model="morador.enviarNotificacaoEmail" label="Enviar notificações por email para esse usuário."
          :disable="modo==='DETALHE'" v-if="morador.email"/>
        <div class="barra-botoes">
          <q-btn class="col-xs-12" color="grey-14" @click="cancelar()" label="Cancelar" size="17px" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="negative" @click="excluir()" label="Excluir"  size="17px" v-if="modo==='ALTERACAO'"/>
          <q-btn class="col-xs-12" color="primary" @click="confirmar()" label="Confirmar" size="17px" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="grey-14" @click="cancelar()" label="Fechar" size="17px" v-if="modo==='DETALHE'"/>
        </div>
      </my-form>
    </q-card>
  </q-dialog>
</template>

<script>
import MySelect from '../../../shared/MySelect'
import MyInputText from '../../../shared/MyInputText'
import MyInputData from '../../../shared/MyInputData'
import MyInputEmail from '../../../shared/MyInputEmail'
import MyInputTelefone from '../../../shared/MyInputTelefone'
import MyForm from '../../../shared/MyForm'
import { TIPO_MORADOR } from '../../../const'
import { getMoradorNew } from '../mixin.js'

export default {
  components: { MySelect, MyInputText, MyInputData, MyInputEmail, MyInputTelefone, MyForm },
  data () {
    return {
      morador: getMoradorNew(),
      tiposMorador: this.carregarValoresCombo(TIPO_MORADOR),
      promiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  methods: {
    async prepararInclusao () {
      // this.$v.morador.$reset()
      this.morador = getMoradorNew()
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
      this.$refs.form.tratarErros().then((ok) => {
        if (ok) {
          if (this.morador.enviarNotificacaoEmail && !this.morador.email) {
            this.alertaErro('Informe um email vádido para que o empregado possa receber notificações por email!')
          } else {
            this.promiseResolve(this.morador)
            this.$refs.modalRef.hide()
          }
        }
      })
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
