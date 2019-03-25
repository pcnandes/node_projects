<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss ref="modalRef"
    :content-css="{minWidth: isMobile?'100vw':'650px', maxWidth: isMobile?'100vw':'60vw'}" :maximized="isMobile">
    <div class="doc-container justify-center gutter-y-sm" style="padding: 20px;">
        <div class="row justify-center q-display-1">
          Cadastro de Colaborador
        </div>
        <q-field class="col-12" icon="mdi-account">
          <q-input v-model="colaborador.nome" float-label="Nome"
            @blur="$v.colaborador.nome.$touch" :error="$v.colaborador.nome.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-arrow-decision">
          <q-select v-model="colaborador.tipoDoc" float-label="Tipo de documento" :options="tiposDoc"
            @blur="$v.colaborador.tipoDoc.$touch" :error="$v.colaborador.tipoDoc.$error"
          />
        </q-field>
        <q-field class="col-12" icon="mdi-account-card-details">
          <q-input v-if="colaborador.tipoDoc==='CPF'" float-label="Número CPF" v-model="colaborador.numeroDoc"
            v-mask="'###.###.###-##'" :placeholder="`Número CPF`"
            @blur="$v.colaborador.numeroDoc.$touch" :error="$v.colaborador.numeroDoc.$error"/>
          <q-input v-else-if="colaborador.tipoDoc==='CNPJ'" float-label="Número CNPJ" v-model="colaborador.numeroDoc"
            v-mask="'##.###.###/####-##'" placeholder="Número CNPJ"
            @blur="$v.colaborador.numeroDoc.$touch" :error="$v.colaborador.numeroDoc.$error"/>
          <q-input v-else-if="colaborador.tipoDoc==='RG'" float-label="Número RG" v-model="colaborador.numeroDoc"
            placeholder="Número RG"
            v-mask="'##############'"
            @blur="$v.colaborador.numeroDoc.$touch" :error="$v.colaborador.numeroDoc.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-calendar">
          <q-datetime v-model="colaborador.dataInicio" type="date" float-label="Inicio Atividade"
            min="2012-12-31" default-view="year" clearable
            @blur="$v.colaborador.dataInicio.$touch" :error="$v.colaborador.dataInicio.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-calendar">
          <q-datetime v-model="colaborador.dataFim" type="date" float-label="Fim Atividade"
            min="2012-12-31" default-view="year" clearable />
        </q-field>
        <q-field class="col-12" icon="mdi-clipboard-text">
          <q-input type="textarea" v-model="colaborador.observacao" float-label="Observações"/>
        </q-field>
        <div class="barra-botoes">
          <q-btn class="col-xs-12" color="faded" @click="cancelar()" label="Cancelar" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="negative" @click="excluir()" label="Excluir"  v-if="modo==='ALTERACAO' && !colaborador.id"/>
          <q-btn class="col-xs-12" color="primary" @click="confirmar()" label="Confirmar" v-if="modo!=='DETALHE'"/>
          <q-btn class="col-xs-12" color="faded" @click="cancelar()" label="Fechar" v-if="modo==='DETALHE'"/>
        </div>
    </div>
  </q-modal>
</template>

<script>
import { QBtn, QField, QInput, QModal, QSelect, QDatetime, QCheckbox } from 'quasar'
import { required, helpers } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'
import { TIPO_DOCUMENTO_COLABORADOR } from '../../../const'
import { getColaboradorNew } from '../mixin.js'

const cpfCnpj = helpers.regex('alpha', /^([0-9]{3}\.?[0-9]{3}\.?[0-9]{3}-?[0-9]{2}|[0-9]{2}\.?[0-9]{3}\.?[0-9]{3}\/?[0-9]{4}-?[0-9]{2})$/)

export default {
  components: {
    QBtn, QField, QInput, QModal, QSelect, QDatetime, QCheckbox
  },
  directives: {mask},
  data () {
    return {
      colaborador: getColaboradorNew(),
      tiposDoc: this.carregarValoresCombo(TIPO_DOCUMENTO_COLABORADOR),
      promiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  validations () {
    return {
      colaborador: {
        tipoDoc: { required },
        nome: { required },
        numeroDoc: this.colaborador.tipoDoc !== TIPO_DOCUMENTO_COLABORADOR.RG ? { required, cpfCnpj } : { required },
        dataInicio: { required }
      }
    }
  },
  methods: {
    async prepararInclusao () {
      this.$v.colaborador.$reset()
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
        this.$v.colaborador.$reset()
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
      this.$v.$touch()
      // data fim maior que inicio
      if (this.colaborador.dataFim && this.maiorData(this.colaborador.dataFim, this.colaborador.dataInicio)) {
        this.$q.notify('A data de fim da atividade não pode ser menor que a data de início.')
      }
      if (this.$v.colaborador.$error) {
        this.$q.notify('Preencha as informações do obrigatórias e clique em confirmar.')
      } else {
        this.promiseResolve(this.colaborador)
        this.$refs.modalRef.hide()
      }
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
