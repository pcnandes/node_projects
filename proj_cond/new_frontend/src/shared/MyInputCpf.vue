<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-sm"
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus"
    :rules="[val => !required || !!val]" @blur="testaCPF()" ref="myInputCpf"
    :readonly="readonly" :disable="disable" mask="###.###.###-##"
    :error="!isValid">
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
      isValid: true
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$emit('input', itemValue)
    },
    hasError () {
      this.$refs.myInputCpf.validate()
      return this.$refs.myInputCpf.hasError
    },
    resetValidation () {
      this.$refs.myInputCpf.resetValidation()
    },
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
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
