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
          observacao: null,  dataInicio: null, dataFim: null}
        <q-field class="col-12" icon="mdi-arrow-decision">
          <q-select v-model="colaborador.tipo" float-label="Tipo de documento" :options="tiposDoc"
            @blur="$v.colaborador.tipoDoc.$touch" :error="$v.colaborador.tipoDoc.$error"
          />
        </q-field>
        <q-field class="col-12" icon="mdi-cellphone">
          <q-input float-label="Documento" v-model="colaborador.numeroDoc"
            v-mask="['###.###.###-##', '########-#']" placeholder="n. documento"
            @blur="$v.colaborador.numeroDoc.$touch" :error="$v.colaborador.numeroDoc.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-calendar">
          <q-datetime v-model="colaborador.dataInicio" type="date" float-label="Inicio Atividade"
            min="2012-12-31" default-view="year"/>
        </q-field>
        <q-field class="col-12" icon="mdi-calendar">
          <q-datetime v-model="colaborador.dataFim" type="date" float-label="Fim Atividade"
            min="2012-12-31" default-view="year"/>
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

// TODO validar de acordo com tipo doc selecionado
const cpf = helpers.regex('alpha', /^\([1-9]{2}\) [2-9][0-9]{3,4}-[0-9]{4}$/)
// const cnpj = helpers.regex('alpha', /^\([1-9]{2}\) [2-9][0-9]{3,4}-[0-9]{4}$/)
// const rg = helpers.regex('alpha', /^\([1-9]{2}\) [2-9][0-9]{3,4}-[0-9]{4}$/)

export default {
  components: {
    QBtn, QField, QInput, QModal, QSelect, QDatetime, QCheckbox
  },
  directives: {mask},
  data () {
    return {
      colaboradores: getColaboradorNew(),
      tiposDoc: this.carregarValoresCombo(TIPO_DOCUMENTO_COLABORADOR),
      promiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  validations: {
    morador: {
      tipoDoc: { required },
      nome: { required },
      // TODO criar validação condicional
      numeroDoc: { required, cpf },
      dataInicio: { required }
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
      // falta validar documentos
      if (this.$v.morador.$error) {
        this.$q.notify('Preencha as informações do obrigatórias e clique em confirmar.')
      } else {
        this.promiseResolve(this.morador)
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
