<template>
  <q-input :value="value" :label="label" @input="updateValue" class="col-12 q-pa-xs q-mb-md" bottom-slots
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus"
    ref="myInputCpf" @blur="hasError()" :error="!isValid" :error-message="errorMessage"
    :readonly="readonly" :disable="disable" mask="SSS #X##">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-placa',
  props: {
    label: { type: String, required: false, default: 'Placa' },
    value: { required: true },
    bgColor: { required: false, default: 'grey-5' },
    color: { required: false, default: 'blue-grey-14' },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    icon: { type: String, required: false, default: 'mdi-card-text' },
    readonly: { type: Boolean, required: false },
    disable: { type: Boolean, required: false }
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
    // trataErro () {
    //  this.hasError()
    //  this.erros.forEach(e => this.alertaErro(e))
    // },
    hasError () {
      // this.erros = []
      // this.erroRequired = this.required && !this.value
      this.errorMessage = null
      if (this.required && !this.value) this.errorMessage = 'Campo obrigatório!'
      if (!this.placaValida()) this.errorMessage = `${this.label} inválida`
    },
    resetValidation () {
      // this.erroRequired = false
      // this.erros = []
      this.errorMessage = null
    },
    placaValida (placa) {
      placa = !placa ? this.value : placa
      if (!placa) return true
      const regexPlaca = /^[A-Z]{3} [0-9][A-Z,0-9][0-9]{2}$/
      return regexPlaca.test(placa)
    }
  },
  computed: {
    isValid: function () {
      // return !this.erroRequired && this.erros.length === 0
      return !this.errorMessage
    }
  }
}
</script>
<style scoped>
</style>
