<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-sm"
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus"
    ref="myInputCpf" @blur="trataErro()" :error="!isValid"
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
      // this.$refs.myInputCpf.validate()
      // return this.$refs.myInputCpf.hasError
      this.erros = []
      this.erroRequired = this.required && !this.value
      if (!this.testaCPF()) this.erros.push(`Informe um ${this.label} válido`)
    },
    resetValidation () {
      this.$refs.myInputCpf.resetValidation()
    },
    // verifica se o CPF é válido
    testaCPF (cpf) {
      cpf = !cpf ? this.value : cpf
      let strCPF = JSON.parse(JSON.stringify(cpf.replace(/[^\d]+/g, '')))
      let Soma
      let Resto
      Soma = 0
      var regexInvalixCpf = /^0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11}$/g
      if (regexInvalixCpf.test(strCPF)) {
        this.isValid = false
        return false
      }
      for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
      Resto = (Soma * 10) % 11
      if ((Resto === 10) || (Resto === 11)) Resto = 0
      if (Resto !== parseInt(strCPF.substring(9, 10))) {
        this.isValid = false
        return false
      }
      Soma = 0
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
      Resto = (Soma * 10) % 11
      if ((Resto === 10) || (Resto === 11)) Resto = 0
      if (Resto !== parseInt(strCPF.substring(10, 11))) {
        this.isValid = false
        return false
      }
      this.isValid = true
      return true
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
