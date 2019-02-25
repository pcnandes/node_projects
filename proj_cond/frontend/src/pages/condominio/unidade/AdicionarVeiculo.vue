<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss ref="modalRef"
    :content-css="{minWidth: isMobile?'100vw':'650px', maxWidth: isMobile?'100vw':'60vw'}" :maximized="isMobile">
    <div class="doc-container justify-center gutter-y-sm" style="padding: 20px;">
        <div class="row justify-center q-display-1">
          Cadastro de Veículo
        </div>
        <q-field class="col-12" icon="mdi-motorbike">
          <q-select v-model="veiculo.tipo" float-label="Tipo" :options="tiposVeiculo"
            @blur="$v.veiculo.tipo.$touch" :error="$v.veiculo.tipo.$error"
          />
        </q-field>
        <q-field class="col-12" icon="mdi-watermark">
          <q-input v-model="veiculo.marca" float-label="Marca"
            @blur="$v.veiculo.marca.$touch" :error="$v.veiculo.marca.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-car">
          <q-input v-model="veiculo.modelo" float-label="Modelo"
            @blur="$v.veiculo.modelo.$touch" :error="$v.veiculo.modelo.$error"/>
        </q-field>
        <q-field class="col-12" icon="mdi-palette">
          <q-select v-model="veiculo.cor" float-label="Cor" :options="cores"
            @blur="$v.veiculo.cor.$touch" :error="$v.veiculo.cor.$error"
          />
        </q-field>
        <q-field class="col-12" icon="mdi-card-text">
          <q-input v-model="veiculo.placa" upper-case v-mask="['SSS ####', 'SSS #X##']"
            float-label="Placa ( AAA 9999 / AAA 9Z99 )"
            @blur="$v.veiculo.placa.$touch" :error="$v.veiculo.placa.$error"/>
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
import { CORES, TIPO_VEICULO } from '../../../const'
import { getVeiculoNew } from '../mixin.js'
import { mask } from 'vue-the-mask'

const placa = helpers.regex('alpha', /^[A-Z]{3} [0-9][A-Z,0-9][0-9]{2}$/)

export default {
  components: {
    QBtn, QField, QInput, QModal, QSelect, QDatetime, QCheckbox
  },
  directives: {mask},
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
  validations: {
    veiculo: {
      tipo: { required },
      marca: { required },
      modelo: {required},
      cor: {required},
      placa: {required, placa}
    }
  },
  methods: {
    async prepararInclusao () {
      this.$v.veiculo.$reset()
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
        this.$v.veiculo.$reset()
        this.veiculo = JSON.parse(JSON.stringify(objAlt))
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
      this.$v.veiculo.$touch()
      if (this.$v.veiculo.$error) {
        this.$q.notify('Preencha as informações do obrigatórias e clique em confirmar.')
      } else {
        // if (this.modo === 'ALTERACAO') {
        this.promiseResolve(this.veiculo)
        // } else if (this.modo === 'INCLUSAO') {
        //  this.promiseResolve(this.veiculo)
        // }
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
