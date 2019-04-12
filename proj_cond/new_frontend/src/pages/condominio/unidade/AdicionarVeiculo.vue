<template>
  <q-dialog persistent ref="modalRef" :maximized="isMobile">
    <q-card style="minWidth: 650px" class="bg-grey-4">
      <q-bar dark class="bg-primary text-white" style="height: 40px">
        <q-icon name="mdi-worker" size="30px"/>
        <div class="col text-center text-weight-bold">Cadastro de Veículo</div>
        <q-space />
        <q-btn dense flat icon="close" v-close-popup size="14px">
          <q-tooltip>Fechar / Cancelar</q-tooltip>
        </q-btn>
      </q-bar>
      <my-form ref="form" class="doc-container justify-center gutter-y-sm row" style="padding: 20px;">
        <my-select ref="tipo" v-model="veiculo.tipo" :options="tiposVeiculo"
          label="Tipo" required emit-value :disable="modo==='DETALHE'"
          icon="mdi-arrow-decision"/>
        <my-input-text ref="marca" icon="mdi-watermark" v-model.trim="veiculo.marca" :disable="modo==='DETALHE'"
          counter max-length="50" label="Marca" autofocus required/>
        <my-input-text ref="modelo" icon="mdi-car" v-model.trim="veiculo.modelo" :disable="modo==='DETALHE'"
          counter max-length="50" label="Modelo" required/>
        <my-select ref="cor" v-model="veiculo.cor" :options="cores" icon="mdi-palette"
          label="Cor" required emit-value :disable="modo==='DETALHE'"
          class="col-md-6"/>
        <my-input-placa ref="placa" v-model="veiculo.placa"
          required :disable="modo==='DETALHE'"
          class="col-md-6"/>
        <div class="barra-botoes">
          <q-btn class="col-xs-12" color="grey-14" @click="cancelar()" label="Cancelar" size="17px" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="primary" @click="confirmar()" label="Confirmar" size="17px" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="negative" @click="excluir()" label="Excluir" size="17px" v-if="modo==='ALTERACAO'"/>
          <q-btn class="col-xs-12" color="grey-14" @click="cancelar()" label="Fechar" size="17px" v-if="modo==='DETALHE'"/>
        </div>
      </my-form>
    </q-card>
  </q-dialog>
</template>

<script>
import MySelect from '../../../shared/MySelect'
import MyInputText from '../../../shared/MyInputText'
import MyInputPlaca from '../../../shared/MyInputPlaca'
import MyForm from '../../../shared/MyForm'
import { CORES, TIPO_VEICULO } from '../../../const'
import { getVeiculoNew } from '../mixin.js'

export default {
  components: { MySelect, MyInputText, MyInputPlaca, MyForm },
  data () {
    return {
      veiculo: getVeiculoNew(),
      cores: this.carregarValoresCombo(CORES),
      tiposVeiculo: this.carregarValoresCombo(TIPO_VEICULO),
      promiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  methods: {
    async prepararInclusao () {
      this.veiculo = getVeiculoNew()
      this.modo = 'INCLUSAO'
      await this.$refs.modalRef.show()
      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve
        this.promiseReject = reject
      })
    },
    async prepararAlteracao (objAlt) {
      try {
        this.veiculo = JSON.parse(JSON.stringify(objAlt))
        this.modo = !this.veiculo.dataExclusao && this.possuiPerfis(['ADMIN', 'SINDICO', 'MORADOR']) ? 'ALTERACAO' : 'DETALHE'
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
      this.$refs.form.tratarErros().then((ok) => {
        if (ok) {
          this.promiseResolve(this.colaborador)
          this.$refs.modalRef.hide()
        }
      })
    },
    excluir () {
      if (this.veiculo.id) {
        this.veiculo.dataExclusao = new Date()
        this.promiseResolve(this.veiculo)
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
