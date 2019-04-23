<template>
  <q-input :value="value" :label="label" @input="updateValue" type="textarea"
    class="q-pa-xs q-mb-md" bottom-slots
    filled  :bg-color="bgColor" :color="color" :autofocus="autofocus"
    ref="myInputTextArea" @blur="hasError()" :error="!isValid" :error-message="errorMessage"
    :readonly="readonly" :disable="disable"
    :counter="counter" :maxlength="maxLength">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-text-area',
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
    resetValidation () {
      // this.$refs.myInputTextArea.resetValidation()
      this.errorMessage = null
    },
    // verifica se o campo possui erros e imprime os erros específicos do mesmo
    /* trataErro () {
      this.hasError()
      this.erros.forEach(e => this.alertaErro(e))
    }, */
    hasError () {
      // this.erros = []
      // this.erroRequired = this.required && !this.value
      this.errorMessage = null
      if (this.required && !this.value) this.errorMessage = 'Campo obrigatório!'
      if (this.verificaErroMaxLength()) this.errorMessage = `Máximo de ${this.maxLength} caracteres`
      return !!this.errorMessage
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
