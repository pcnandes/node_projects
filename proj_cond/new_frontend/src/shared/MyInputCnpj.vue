<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-sm"
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus"
    :rules="[val => !required || !!val]" ref="myInputCnpj"
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
      isValid: false
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
    testaCPF (strCnpj) {
      let cnpj = JSON.parse(JSON.stringify(strCnpj.replace(/[^\d]+/g, '')))
      if (cnpj === '') return false
      if (cnpj.length !== 14) return false
      // Elimina CNPJs invalidos conhecidos
      if (cnpj === '00000000000000' || cnpj === '11111111111111' || cnpj === '22222222222222' ||
          cnpj === '33333333333333' || cnpj === '44444444444444' || cnpj === '55555555555555' ||
          cnpj === '66666666666666' || cnpj === '77777777777777' || cnpj === '88888888888888' ||
          cnpj === '99999999999999') return false
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
