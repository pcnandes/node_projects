<template>
  <q-input :value="value" :label="label" :type="isPwd ? 'password' : 'text'" @input="updateValue"
    filled bg-color="grey-5" color="blue-grey-14" :autofocus="autofocus" class="col-12 q-pa-xs q-mb-md" bottom-slots
    ref="myInputPass" :error="!isValid" :error-message="errorMessage"
    :readonly="readonly" :disable="disable">
    <template v-slot:append>
      <q-icon
        :name="isPwd ? 'visibility_off' : 'visibility'"
        class="cursor-pointer"
        @click="isPwd = !isPwd"
      />
    </template>
    <template v-slot:prepend>
      <q-icon name="mdi-textbox-password" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-password',
  props: {
    label: { type: String, required: false, default: 'Senha' },
    value: { required: true },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    readonly: { type: Boolean, required: false },
    disable: { type: Boolean, required: false }
  },
  data () {
    return {
      isPwd: true,
      // comErro: false
      errorMessage: null
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$emit('input', itemValue)
    },
    hasError () {
      // this.$refs.myInputPass.validate()
      // this.comErro = this.$refs.myInputPass.hasError
      // return this.comErro
      this.errorMessage = null
      if (this.required && !this.value) this.errorMessage = 'Campo obrigatório!'
    },
    resetValidation () {
      // this.$refs.myInputPass.resetValidation()
      this.errorMessage = null
    }
  },
  computed: {
    isValid: function () {
      return !this.errorMessage
    }
  }
}
</script>
<style scoped>
</style>
