<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-sm" v-bind:class="counter ? 'q-mb-lg' : ''"
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus" type="email"
    @blur="trataErro()" ref="myInputEmail"
    :readonly="readonly" :disable="disable" :error="!isValid"
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
      erros: [],
      erroRequired: false
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$emit('input', itemValue)
    },
    // verifica se o campo possui erros e imprime os erros específicos do mesmo
    trataErro () {
      this.hasError()
      this.erros.forEach(e => this.alertaErro(e))
    },
    hasError () {
      // this.$refs.myInputEmail.validate()
      // return this.$refs.myInputEmail.hasError
      this.erros = []
      this.erroRequired = this.required && !this.value
      if (!this.testaEmail()) this.erros.push(`Informe um ${this.label} válido`)
      if (this.verificaErroMaxLength()) this.erros.push(`Informe menos de ${this.maxLength} caracteres no campo ${this.label}`)
    },
    resetValidation () {
      this.$refs.myInputEmail.resetValidation()
    },
    testaEmail () {
      console.log('auiii')
      if (!this.value) return true
      var regexInvalidMail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{1,3})+$/g
      if (!regexInvalidMail.test(this.value)) {
        this.isValid = false
        return false
      }
      this.isValid = true
      return true
    },
    verificaErroMaxLength () {
      return this.maxLength && this.value && this.value.length > this.maxLength
    }
  },
  computed: {
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
