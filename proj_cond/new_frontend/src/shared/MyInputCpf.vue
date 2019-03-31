<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-sm"
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus"
    :rules="[val => !required || !!val, val => testaCPF(val)]" ref="myInputCpf"
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
      isValid: false
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
    testaCPF (cpf) {
      let strCPF = JSON.parse(JSON.stringify(cpf.replace(/[^\d]+/g, '')))
      console.log(strCPF)
      let Soma
      let Resto
      Soma = 0
      if (cpf.length !== 11 || cpf === '00000000000' || cpf === '11111111111' || cpf === '22222222222' ||
        cpf === '33333333333' || cpf === '44444444444' || cpf === '55555555555' || cpf === '66666666666' ||
        cpf === '77777777777' || cpf === '88888888888' || cpf === '99999999999') return false

      for (let i = 1; i <= 9; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (11 - i)
      Resto = (Soma * 10) % 11
      if ((Resto === 10) || (Resto === 11)) Resto = 0
      if (Resto !== parseInt(strCPF.substring(9, 10))) return false
      Soma = 0
      for (let i = 1; i <= 10; i++) Soma = Soma + parseInt(strCPF.substring(i - 1, i)) * (12 - i)
      Resto = (Soma * 10) % 11
      if ((Resto === 10) || (Resto === 11)) Resto = 0
      if (Resto !== parseInt(strCPF.substring(10, 11))) return false
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
