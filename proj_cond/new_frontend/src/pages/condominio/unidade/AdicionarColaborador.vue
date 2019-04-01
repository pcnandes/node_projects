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
      <div class="doc-container justify-center gutter-y-sm row" style="padding: 20px;">
        <my-input-text ref="nome" v-model.trim="colaborador.nome"
            counter max-length="50" label="Nome" autofocus required
            class="col-12" icon="mdi-account"/>
        <my-select ref="tipo_documento" v-model="colaborador.tipoDoc" @input="colaborador.numeroDoc = ''"
          :options="tiposDoc" label="Tipo de documento" required emit-value
          class="col-xs-12 col-md-6" icon="mdi-arrow-decision"/>
        <my-input-cpf ref="cpf" v-if="colaborador.tipoDoc==='CPF'" v-model.trim="colaborador.numeroDoc"
          required class="col-xs-12 col-md-6"/>
        <my-input-cnpj ref="cnpj" v-if="colaborador.tipoDoc==='CNPJ'" v-model.trim="colaborador.numeroDoc"
          required class="col-xs-12 col-md-6"/>
        <my-input-rg ref="rg" v-if="colaborador.tipoDoc==='RG'" v-model.trim="colaborador.numeroDoc"
          required class="col-xs-12 col-md-6"/>
        <my-input-data ref="dataInicio" v-model.trim="colaborador.dataInicio"
          required class="col-xs-12 col-md-6" label="Inicio Atividade"/>
        <my-input-data ref="dataFim" v-model.trim="colaborador.dataFim"
          class="col-xs-12 col-md-6" label="Fim Atividade"/>
        <my-input-text-area ref="observacao" v-model.trim="colaborador.observacao"
            counter max-length="500" label="Observações"
            class="col-12" icon="mdi-clipboard-text"/>
        <div class="barra-botoes">
          <q-btn class="col-xs-12" color="grey-14" @click="cancelar()" label="Cancelar" size="17px" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="negative" @click="excluir()" label="Excluir" size="17px" v-if="modo==='ALTERACAO' && !colaborador.id"/>
          <q-btn class="col-xs-12" color="primary" @click="confirmar()" label="Confirmar" size="17px" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="grey-14" @click="cancelar()" label="Fechar" size="17px" v-if="modo==='DETALHE'"/>
        </div>
      </div>
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

export default {
  components: { MyInputText, MySelect, MyInputCpf, MyInputCnpj, MyInputRg, MyInputData, MyInputTextArea },
  // directives: {mask},
  data () {
    return {
      colaborador: getColaboradorNew(),
      tiposDoc: this.carregarValoresCombo(TIPO_DOCUMENTO_COLABORADOR),
      promiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  /*
  validations () {
    return {
      colaborador: {
        tipoDoc: { required },
        nome: { required },
        numeroDoc: this.colaborador.tipoDoc !== TIPO_DOCUMENTO_COLABORADOR.RG ? { required, cpfCnpj } : { required },
        dataInicio: { required }
      }
    }
  }, */
  methods: {
    async prepararInclusao () {
      // this.$v.colaborador.$reset()
      this.colaborador = getColaboradorNew()
      this.modo = 'INCLUSAO'
      await this.$refs.modalRef.show()
      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve
        this.promiseReject = reject
      })
    },
    async prepararAlteracao (objAlt) {
      try {
        // this.$v.colaborador.$reset()
        this.colaborador = JSON.parse(JSON.stringify(objAlt))
        this.modo = this.possuiPerfis(['ADMIN', 'SINDICO', 'MORADOR']) ? 'ALTERACAO' : 'DETALHE'
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
      // this.$v.$touch()
      // data fim maior que inicio
      if (this.colaborador.dataFim && this.maiorData(this.colaborador.dataFim, this.colaborador.dataInicio)) {
        this.$q.notify('A data de fim da atividade não pode ser menor que a data de início.')
      }
      // if (erro) {
      //  this.$q.notify('Preencha as informações do obrigatórias e clique em confirmar.')
      // } else {
      this.promiseResolve(this.colaborador)
      this.$refs.modalRef.hide()
      // }
    },
    excluir () {
      if (!this.colaborador.id) {
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
