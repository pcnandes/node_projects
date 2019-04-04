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
      <q-form ref="formColaborador" class="doc-container justify-center gutter-y-sm row" style="padding: 20px;">
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
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { TIPO_DOCUMENTO_COLABORADOR } from '../../../const'
import { Colaborador } from '../mixin.js'
import MyInputText from '../../../shared/MyInputText'
import MySelect from '../../../shared/MySelect'
import MyInputCpf from '../../../shared/MyInputCpf'
import MyInputCnpj from '../../../shared/MyInputCnpj'
import MyInputRg from '../../../shared/MyInputRg'
import MyInputData from '../../../shared/MyInputData'
import MyInputTextArea from '../../../shared/MyInputTextArea'

export default {
  components: { MyInputText, MySelect, MyInputCpf, MyInputCnpj, MyInputRg, MyInputData, MyInputTextArea },
  data () {
    return {
      colaborador: new Colaborador(),
      tiposDoc: this.carregarValoresCombo(TIPO_DOCUMENTO_COLABORADOR),
      promiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  methods: {
    async prepararInclusao () {
      this.colaborador = new Colaborador()
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
      if (this.colaborador.dataFim && this.maiorData(this.colaborador.dataFim, this.colaborador.dataInicio)) {
        this.alertaErro('A data de fim da atividade não pode ser menor que a data de início.')
      }
      let validacao = []
      validacao.push(this.$refs.nome.hasError())
      validacao.push(this.$refs.dataInicio.hasError())
      if (this.colaborador.tipoDoc === 'CPF') validacao.push(this.$refs.cpf.hasError())
      else if (this.colaborador.tipoDoc === 'CNPJ') validacao.push(this.$refs.cnpj.hasError())
      else if (this.colaborador.tipoDoc === 'RG') validacao.push(this.$refs.rg.hasError())
      let erro = this.verificaErrosCampos(validacao)
      // verifica data inicio maior que fim
      if (this.colaborador.dataFim && this.colaborador.dataInicio && this.maiorData(this.colaborador.dataFim, this.colaborador.dataInicio)) {
        this.$q.notify('A data de fim da atividade não pode ser menor que a data de início.')
        return
      }
      // valida cpf e cnpj
      if (this.colaborador.tipoDoc === 'CPF' && !this.$refs.cpf.isValid) this.alertaErro('Informe um CPF válido')
      else if (this.colaborador.tipoDoc === 'CNPJ' && !this.$refs.cnpj.isValid) this.alertaErro('Informe um CNPJ válido')
      if (erro) {
        this.alertaErro('Preencha as informações do obrigatórias e clique em confirmar.')
      } else {
        this.promiseResolve(this.colaborador)
        this.$refs.modalRef.hide()
      }
      /* this.$refs.formColaborador.validate().then(success => {
        console.log(success)
        if (success) {
          this.promiseResolve(this.colaborador)
          this.$refs.modalRef.hide()
        } else {
          if (this.colaborador.tipoDoc === 'CPF' && !this.$refs.cpf.isValid) this.alertaErro('Informe um CPF válido')
          else if (this.colaborador.tipoDoc === 'CNPJ' && !this.$refs.cnpj.isValid) this.alertaErro('Informe um CNPJ válido')
          this.alertaErro('Preencha as informações do obrigatórias e clique em confirmar.')
        }
      }) */
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
