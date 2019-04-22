<template>
  <q-dialog persistent ref="modalRef" :maximized="isMobile">
    <q-card style="minWidth: 650px" class="bg-grey-4">
      <q-bar dark class="bg-primary text-white" style="height: 40px">
        <q-icon name="mdi-worker" size="30px"/>
        <div class="col text-center text-weight-bold">Cadastro de Colaborador</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup size="14px">
          <q-tooltip>Fechar / Cancelar</q-tooltip>
        </q-btn>
      </q-bar>
      <my-form ref="form" class="doc-container justify-center gutter-y-sm row" style="padding: 20px;">
        <my-input-text ref="nome" v-model.trim="colaborador.nome"
            counter max-length="50" label="Nome" autofocus required
            icon="mdi-account" :disable="modo==='DETALHE'"/>
        <my-select ref="tipo_documento" v-model="colaborador.tipoDoc" @input="colaborador.numeroDoc = ''"
          :options="tiposDoc" label="Tipo de documento" required emit-value
          class="col-md-6" icon="mdi-arrow-decision" :disable="modo==='DETALHE'"/>
        <my-input-cpf ref="cpf" v-if="colaborador.tipoDoc==='CPF'" v-model.trim="colaborador.numeroDoc"
          required class="col-md-6" :disable="modo==='DETALHE'"/>
        <my-input-cnpj ref="cnpj" v-if="colaborador.tipoDoc==='CNPJ'" v-model.trim="colaborador.numeroDoc"
          required class="col-md-6" :disable="modo==='DETALHE'"/>
        <my-input-rg ref="rg" v-if="colaborador.tipoDoc==='RG'" v-model.trim="colaborador.numeroDoc"
          required class="col-md-6" :disable="modo==='DETALHE'"/>
        <my-input-data ref="dataInicio" v-model.trim="colaborador.dataInicio"
          required class="col-md-6" label="Inicio Atividade" :disable="modo==='DETALHE'"/>
        <my-input-data ref="dataFim" v-model.trim="colaborador.dataFim"
          class="col-md-6" label="Fim Atividade" :disable="modo==='DETALHE'"/>
        <my-input-text-area ref="observacao" v-model.trim="colaborador.observacao"
          counter max-length="500" label="Observações"
          icon="mdi-clipboard-text" :disable="modo==='DETALHE'"/>
        <div class="barra-botoes">
          <q-btn class="col-xs-12" color="grey-14" @click="cancelar()" label="Cancelar" size="17px" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="negative" @click="excluir()" label="Excluir" size="17px" v-if="modo==='ALTERACAO' && !colaborador.id"/>
          <q-btn class="col-xs-12" color="primary" @click="confirmar()" label="Confirmar" size="17px" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="grey-14" @click="cancelar()" label="Fechar" size="17px" v-if="modo==='DETALHE'"/>
        </div>
      </my-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { TIPO_DOCUMENTO_COLABORADOR } from '../../../const'
import { getColaboradorNew } from '../mixin.js'
import MyInputText from '../../../shared/MyInputText'
import MySelect from '../../../shared/MySelect'
import MyInputCpf from '../../../shared/MyInputCpf'
import MyInputCnpj from '../../../shared/MyInputCnpj'
import MyInputRg from '../../../shared/MyInputRg'
import MyInputData from '../../../shared/MyInputData'
import MyInputTextArea from '../../../shared/MyInputTextArea'
import MyForm from '../../../shared/MyForm'

export default {
  components: { MyInputText, MySelect, MyInputCpf, MyInputCnpj, MyInputRg, MyInputData, MyInputTextArea, MyForm },
  data () {
    return {
      colaborador: getColaboradorNew(),
      tiposDoc: this.carregarValoresCombo(TIPO_DOCUMENTO_COLABORADOR),
      promiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  methods: {
    async prepararInclusao () {
      this.colaborador = getColaboradorNew()
      this.modo = 'INCLUSAO'
      await this.$refs.modalRef.show()
      this.limparValidacao()
      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve
        this.promiseReject = reject
      })
    },
    async prepararAlteracao (objAlt) {
      try {
        this.colaborador = JSON.parse(JSON.stringify(objAlt))
        this.modo = this.possuiPerfis(['ADMIN', 'SINDICO', 'MORADOR']) ? 'ALTERACAO' : 'DETALHE'
        await this.$refs.modalRef.show()
        this.limparValidacao()
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
      this.$refs.form.tratarErros().then((ok) => {
        if (ok) {
          if (this.colaborador.dataFim && this.maiorData(this.colaborador.dataInicio, this.colaborador.dataFim)) {
            this.alertaErro('A data de fim da atividade não pode ser menor que a data de início.')
          } else {
            this.promiseResolve(this.colaborador)
            this.$refs.modalRef.hide()
          }
        }
      })
    },
    excluir () {
      if (!this.colaborador.id) {
        this.promiseResolve(null)
      }
      this.$refs.modalRef.hide()
    },
    limparValidacao () {
      this.$refs.nome.resetValidation()
      this.$refs.dataInicio.resetValidation()
      this.$refs.dataFim.resetValidation()
      if (this.$refs.tipoDoc) this.$refs.tipoDoc.resetValidation()
      if (this.$refs.cpf) this.$refs.cpf.resetValidation()
      if (this.$refs.cnpj) this.$refs.cnpj.resetValidation()
      if (this.$refs.rg) this.$refs.rg.resetValidation()
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
