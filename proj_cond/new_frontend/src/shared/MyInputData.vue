<template>
  <!-- :rules="[val => !val || dataValida(val) , val => !required || !!val]" -->
  <q-input :value="dataFormatada" @input="updateValue" :label="label" class="q-pa-xs q-mb-sm"
    filled :bg-color="bgColor" mask="##/##/####" :color="color" :autofocus="autofocus" ref="myInputData"
    :readonly="readonly" :disable="disable" :error="!isValid" @blur="hasError()">
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
    minDate: { type: Number, required: false },
    maxDate: { type: Number, required: false }
  },
  data () {
    return {
      erros: [],
      erroRequired: false
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$refs.myInputDataProx.hide()
      this.$emit('input', new Date(itemValue))
    },
    hasError () {
      this.erros = []
      this.erroRequired = this.required && !this.value
      if (!this.dataValida()) this.erros.push(`Informe uma data válida`)
      // this.$refs.myInputData.validate()
      // return this.$refs.myInputData.hasError
    },
    dataValida () {
      return date.isValid(this.value)
    },
    resetValidation () {
      this.erroRequired = false
      this.erros = []
      // this.$refs.myInputData.resetValidation()
    }
  },
  computed: {
    dataFormatada: function () {
      return date.formatDate(this.value, 'DD/MM/YYYY')
    },
    dataFormatadaComData: function () {
      return date.formatDate(this.value, 'YYYY/MM/DD')
    },
    isValid: function () {
      return !this.erroRequired && this.erros.length === 0
    }
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
