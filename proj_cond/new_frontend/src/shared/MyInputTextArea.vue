<template>
  <q-input :value="value" :label="label" @input="updateValue" type="textarea" class="q-pa-xs q-mb-sm" v-bind:class="counter ? 'q-mb-lg' : ''"
    filled  :bg-color="bgColor" :color="color" :autofocus="autofocus"
    ref="myInputTextArea" :error="!isValid" @blur="trataErro()"
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
      erros: [],
      erroRequired: false
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$emit('input', itemValue)
    },
    resetValidation () {
      this.$refs.myInputTextArea.resetValidation()
    },
    // verifica se o campo possui erros e imprime os erros específicos do mesmo
    trataErro () {
      this.hasError()
      this.erros.forEach(e => this.alertaErro(e))
    },
    hasError () {
      // this.$refs.myInputTextArea.validate()
      // return this.$refs.myInputTextArea.hasError
      this.erros = []
      this.erroRequired = this.required && !this.value
      if (this.verificaErroMaxLength()) this.erros.push(`Informe menos de ${this.maxLength} caracteres no campo ${this.label}`)
    },
    verificaErroMaxLength () {
      return this.maxLength && this.value.length > this.maxLength
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
