<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss ref="modalRef"
    :content-css="{minWidth: isMobile?'100vw':'650px', maxWidth: isMobile?'100vw':'60vw'}" :maximized="isMobile">
    <div class="doc-container justify-center gutter-y-sm" style="padding: 20px;">
        <div class="row justify-center q-display-1">
          Cadastro de Colaborador
        </div>
        <q-field class="col-12" icon="mdi-account">
          <q-input v-model="colaborador.nome" float-label="Nome"
            @blur="$v.nome.$touch" :error="$v.nome.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-arrow-decision">
          <q-select v-model="colaborador.tipoDoc" float-label="Tipo de documento" :options="tiposDoc"
            @blur="$v.tipoDoc.$touch" :error="$v.tipoDoc.$error"
          />
        </q-field>
        <q-field class="col-12" icon="mdi-account-card-details">
          <q-input v-if="tipoDocumentoSelecionado==='CPF'" float-label="Número CPF" v-model="colaborador.numeroDoc"
            v-mask="'###.###.###-##'" :placeholder="`Número ${tipoDocumentoSelecionado}`"
            @blur="$v.numeroDoc.$touch" :error="$v.numeroDoc.$error"/>
          <q-input v-if="tipoDocumentoSelecionado==='CNPJ'" float-label="Número CNPJ" v-model="colaborador.numeroDoc"
            v-mask="'##.###.###/####-##'" placeholder="Número CNPJ"
            @blur="$v.numeroDoc.$touch" :error="$v.numeroDoc.$error"/>
          <q-input v-if="tipoDocumentoSelecionado==='RG'" type="number" float-label="Número RG" v-model="colaborador.numeroDoc"
            placeholder="Número RG"
            @blur="$v.numeroDoc.$touch" :error="$v.numeroDoc.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-calendar">
          <q-datetime v-model="colaborador.dataInicio" type="date" float-label="Inicio Atividade"
            min="2012-12-31" default-view="year"
            @blur="$v.dataInicio.$touch" :error="$v.dataInicio.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-calendar">
          <q-datetime v-model="colaborador.dataFim" type="date" float-label="Fim Atividade"
            min="2012-12-31" default-view="year"/>
        </q-field>
        <q-field class="col-12" icon="mdi-clipboard-text">
          <q-input type="textarea" v-model="colaborador.observacao" float-label="Observações"/>
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
      tipoDoc: { required },
      nome: { required },
      numeroDoc: this.colaborador.tipoDoc !== TIPO_DOCUMENTO_COLABORADOR.RG ? { required, cpfCnpj } : { required },
      dataInicio: { required }
    }
  },
  methods: {
    async prepararInclusao () {
      this.$v.$reset()
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
      this.$v.$touch()
      // falta validar documentos
      if (this.$v.$error) {
        this.$q.notify('Preencha as informações do obrigatórias e clique em confirmar.')
      } else {
        this.promiseResolve(this.morador)
        this.$refs.modalRef.hide()
      }
    }
  },
  computed: {
    tipoDocumentoSelecionado: function () {
      return this.colaborador.tipoDoc
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
