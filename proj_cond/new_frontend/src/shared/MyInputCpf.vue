<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-md" bottom-slots
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus"
    ref="myInputCpf" @blur="hasError()" :error="!isValid" :error-message="errorMessage"
    :readonly="readonly" :disable="disable" mask="###.###.###-##">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-cpf',
  props: {
    label: { type: String, required: false, default: 'CPF' },
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
    hasError () {
      // this.$refs.myInputCpf.validate()
      // return this.$refs.myInputCpf.hasError
      // this.erros = []
      this.errorMessage = null
      if (this.required && !this.value) this.errorMessage = 'Campo obrigatório!'
      if (!this.testaCPF()) this.errorMessage = `Informe um ${this.label} válido`
      return !!this.errorMessage
    },
    resetValidation () {
      // this.$refs.myInputCpf.resetValidation()
      this.errorMessage = null
    },
    // verifica se o CPF é válido
    testaCPF (cpf) {
      cpf = !cpf ? this.value : cpf
      let strCPF = JSON.parse(JSON.stringify(cpf.replace(/[^\d]+/g, '')))
      let Soma
      let Resto
      Soma = 0
      const regexInvalixCpf = /^0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}$/g
      if (regexInvalixCpf.test(strCPF)) return false
      for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
      Resto = (Soma * 10) % 11
      if ((Resto === 10) || (Resto === 11)) Resto = 0
      if (Resto !== parseInt(strCPF.substring(9, 10))) return false
      Soma = 0
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
      Resto = (Soma * 10) % 11
      if ((Resto === 10) || (Resto === 11)) Resto = 0
      if (Resto !== parseInt(strCPF.substring(10, 11))) return false
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
