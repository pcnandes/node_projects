<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-sm"
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus"
    :rules="[val => !required || !!val]" @blur="testaCNPJ()" ref="myInputCnpj"
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
      isValid: true
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$emit('input', itemValue)
    },
    hasError () {
      this.$refs.myInputCnpj.validate()
      return this.$refs.myInputCnpj.hasError
    },
    resetValidation () {
      this.$refs.myInputCnpj.resetValidation()
    },
    testaCNPJ (strCnpj) {
      let cnpj = JSON.parse(JSON.stringify(strCnpj.replace(/[^\d]+/g, '')))
      if (cnpj === '') return false
      if (cnpj.length !== 14) return false
      // Elimina CNPJs invalidos conhecidos
      var regexInvalixCnpj = /^0{14}|1{14}|2{14}|3{14}|4{14}|5{14}|6{14}|7{14}|8{14}|9{14}$/g
      if (regexInvalixCnpj.test(strCnpj)) {
        this.isValid = false
        return false
      }
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
      if (resultado !== digitos.charAt(0)) {
        this.isValid = false
        return false
      }
      tamanho = tamanho + 1
      numeros = cnpj.substring(0, tamanho)
      soma = 0
      pos = tamanho - 7
      for (let i = tamanho; i >= 1; i--) {
        soma += numeros.charAt(tamanho - i) * pos--
        if (pos < 2) pos = 9
      }
      resultado = soma % 11 < 2 ? 0 : 11 - soma % 11
      if (resultado !== digitos.charAt(1)) {
        this.isValid = false
        return false
      }
      this.isValid = true
      return true
    }
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
