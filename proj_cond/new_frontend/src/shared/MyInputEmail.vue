<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-sm" v-bind:class="counter ? 'q-mb-lg' : ''"
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus" type="email"
    @blur="hasError()" ref="myInputEmail"
    :readonly="readonly" :disable="disable" :error="!isValid" :error-message="errorMessage"
    :counter="counter" :maxlength="maxLength">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-email',
  props: {
    label: { type: String, required: false, default: 'Email' },
    value: { required: true },
    bgColor: { required: false, default: 'grey-5' },
    color: { required: false, default: 'blue-grey-14' },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    icon: { type: String, required: false, default: 'mdi-email' },
    readonly: { type: Boolean, required: false },
    disable: { type: Boolean, required: false },
    counter: { type: Boolean, required: false },
    maxLength: { required: false }
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
      // this.$refs.myInputEmail.validate()
      // return this.$refs.myInputEmail.hasError
      // this.erros = []
      // this.erroRequired = this.required && !this.value
      this.errorMessage = null
      if (this.required && !this.value) this.errorMessage = 'Campo obrigatório!'
      else if (!this.testaEmail()) this.errorMessage = `${this.label} inválido!`
      else if (this.verificaErroMaxLength()) this.errorMessage = `Máximo de ${this.maxLength} caracteres`
    },
    resetValidation () {
      // this.$refs.myInputEmail.resetValidation()
      this.errorMessage = null
    },
    testaEmail () {
      if (!this.value) return true
      var regexInvalidMail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{1,3})+$/g
      return regexInvalidMail.test(this.value)
    },
    verificaErroMaxLength () {
      return this.maxLength && this.value && this.value.length > this.maxLength
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
