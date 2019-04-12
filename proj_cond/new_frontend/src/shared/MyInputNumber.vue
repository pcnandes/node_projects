<template>
  <q-input :value="value" :label="label" @input="updateValue" class="col-12 q-pa-xs q-mb-md" bottom-slots
    filled  :bg-color="bgColor" :color="color" :autofocus="autofocus"
    ref="myInputNumber" @blur="hasError()" :error="!isValid" :error-message="errorMessage"
    :readonly="readonly" :disable="disable" :mask="mascara">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-number',
  props: {
    label: { type: String, required: true },
    value: { required: true },
    bgColor: { required: false, default: 'grey-5' },
    color: { required: false, default: 'blue-grey-14' },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    icon: { type: String, required: false },
    readonly: { type: Boolean, required: false },
    disable: { type: Boolean, required: false },
    maxLength: { type: Number, required: false, default: 9 },
    maxValue: { type: Number, required: false },
    minValue: { type: Number, required: false }
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
      this.$emit('input', itemValue)
    },
    // verifica se o campo possui erros e imprime os erros específicos do mesmo
    /* trataErro () {
      this.hasError()
      this.erros.forEach(e => this.alertaErro(e))
    }, */
    hasError () {
      // this.$refs.myInputNumber.validate()
      // return this.$refs.myInputNumber.hasError
      // this.erros = []
      // this.erroRequired = this.required && !this.value
      this.errorMessage = null
      if (this.required && !this.value) this.errorMessage = 'Campo obrigatório!'
      if (this.verificaErroMaxLength()) this.errorMessage = `Máximo de ${this.maxLength} caracteres`
      if (this.verificaErroMaxValue()) this.errorMessage = `Número maior que ${this.maxValue}`
      if (this.verificaErroMinValue()) this.errorMessage = `Número menor que ${this.maxValue}`
    },
    resetValidation () {
      // this.$refs.myInputNumber.resetValidation()
      this.errorMessage = null
    },
    verificaErroMaxLength () {
      return this.maxLength && this.value && this.value.length > this.maxLength
    },
    verificaErroMaxValue () {
      return this.maxLength && this.value && this.value > this.maxValue
    },
    verificaErroMinValue () {
      return this.maxLength && this.value && this.value < this.minValue
    }
  },
  computed: {
    mascara: function () {
      let retorno = ''
      for (let i = 0; i < this.maxLength; i++) {
        retorno += '#'
      }
      return retorno
    },
    isValid: function () {
      // return !this.erroRequired && this.erros.length === 0
      return !this.errorMessage
    }
  }
}
</script>
<style scoped>
</style>
