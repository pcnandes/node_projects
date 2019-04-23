<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-md" bottom-slots
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus"
    ref="myInputCnpj" @blur="hasError()" :error="!isValid" :error-message="errorMessage"
    :readonly="readonly" :disable="disable" mask="##.###.###/####-##">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-cnpj',
  props: {
    label: { type: String, required: false, default: 'CNPJ' },
    value: { required: true },
    bgColor: { required: false, default: 'grey-5' },
    color: { required: false, default: 'blue-grey-14' },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    icon: { type: String, required: false, default: 'mdi-account-card-details' },
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
    /* trataErro () {
      this.hasError()
      this.erros.forEach(e => this.alertaErro(e))
    }, */
    // verifica se o campo possui erros
    hasError () {
      // this.$refs.myInputCnpj.validate()
      // return this.$refs.myInputCnpj.hasError
      // this.erros = []
      this.errorMessage = null
      if (this.required && !this.value) this.errorMessage = 'Campo obrigatório!'
      if (!this.testaCNPJ()) this.errorMessage = `${this.label} inválido!`
      return !!this.errorMessage
    },
    // limpa a validação do campo
    resetValidation () {
      // this.$refs.myInputCnpj.resetValidation()
      this.errorMessage = null
    },
    // verifica se o CNPJ informado é válido
    testaCNPJ (strCnpj) {
      let cnpj = JSON.parse(JSON.stringify(strCnpj.replace(/[^\d]+/g, '')))
      if (cnpj === '') return false
      if (cnpj.length !== 14) return false
      // Elimina CNPJs invalidos conhecidos
      const regexInvalixCnpj = /^0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}$/g
      if (regexInvalixCnpj.test(strCnpj)) return false
      // Valida DVs
      let tamanho = cnpj.length - 2
      let numeros = cnpj.substring(0, tamanho)
      let digitos = cnpj.substring(tamanho)
      let soma = 0
      let pos = tamanho - 7
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
      if (resultado !== digitos.charAt(0)) return false
      tamanho = tamanho + 1
      numeros = cnpj.substring(0, tamanho)
      soma = 0
      pos = tamanho - 7
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
      if (resultado !== digitos.charAt(1)) return false
      return true
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
