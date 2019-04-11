<template>
  <!-- :rules="[val => !val || dataValida(val) , val => !required || !!val]" -->
  <q-input :value="dataFormatada" @input="updateValue" :label="label" class="q-pa-xs q-mb-sm"
    filled :bg-color="bgColor" mask="##/##/####" :color="color" :autofocus="autofocus" ref="myInputData"
    :readonly="readonly" :disable="disable" :error="!isValid" @blur="hasError()" :error-message="errorMessage">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="myInputDataProx">
          <q-date :value="dataFormatadaComData" @input="updateValue" minimal/>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>

import { date } from 'quasar'

export default {
  name: 'my-input-data',
  props: {
    label: { type: String, required: true },
    value: { required: true },
    bgColor: { required: false, default: 'grey-5' },
    color: { required: false, default: 'blue-grey-14' },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    readonly: { type: Boolean, required: false },
    disable: { type: Boolean, required: false },
    minDate: { required: false },
    maxDate: { required: false }
  },
  data () {
    return {
      // erros: [],
      // erroRequired: false
      errorMessage: null
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$refs.myInputDataProx.hide()
      this.$emit('input', new Date(itemValue))
    },
    // verifica se o campo possui erros e imprime os erros específicos do mesmo
    /* trataErro () {
      this.hasError()
      this.erros.forEach(e => this.alertaErro(e))
    }, */
    // verifica se o campo possui erros
    hasError () {
      this.errorMessage = null
      if (this.required && !this.value) this.errorMessage = 'Campo obrigatório!'
      if (!this.dataValida()) this.errorMessage = `Data válida!`
      if (!this.minDateValido()) this.errorMessage = `Data menor que ${date.formatDate(this.minDate, 'DD/MM/YYYY')}`
      if (!this.maxDateValido()) this.errorMessage = `Data maior que ${date.formatDate(this.maxDate, 'DD/MM/YYYY')}`
      // this.$refs.myInputData.validate()
      // return this.$refs.myInputData.hasError
    },
    // valida a data informada
    dataValida () {
      return !this.value || date.isValid(this.value)
    },
    // se o campo min-date for informado verifica se a data é maior que ele
    minDateValido () {
      if (!this.minDate || !this.value) return true
      let _minData = new Date(this.minDate)
      return !this.dataValida() || !date.isValid(_minData) || this.maiorData(this.value, _minData)
    },
    // se o campo mx-date for informado verifica se a data é menor que ele
    maxDateValido () {
      if (!this.maxDate || !this.value) return true
      let _maxData = new Date(this.maxDate)
      return !this.dataValida() || !date.isValid(_maxData) || !this.maiorData(this.value, _maxData)
    },
    // limpa a validação do campo
    resetValidation () {
      // this.erroRequired = false
      // this.erros = []
      // this.$refs.myInputData.resetValidation()
      this.errorMessage = null
    }
  },
  computed: {
    // formata a data para ser apresentada no input
    dataFormatada: function () {
      return date.formatDate(this.value, 'DD/MM/YYYY')
    },
    // formata a data para setar o componente de data
    dataFormatadaComData: function () {
      return date.formatDate(this.value, 'YYYY/MM/DD')
    },
    // verifica se a data é valida
    isValid: function () {
      // return !this.erroRequired && this.erros.length === 0
      return !this.errorMessage
    }
  }
}
</script>
<style scoped>
</style>
