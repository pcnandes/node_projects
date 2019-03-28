<template>
  <q-input :value="value" :label="label" :type="isPwd ? 'password' : 'text'" @input="updateValue"
    filled bg-color="grey-5" color="blue-grey-14" :autofocus="autofocus" class="q-pa-xs q-mb-sm"
    :rules="[val => !required || !!val]" ref="myInputPass" :error="comErro"
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
      comErro: false
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$emit('input', itemValue)
    },
    hasError () {
      this.$refs.myInputPass.validate()
      this.comErro = this.$refs.myInputPass.hasError
      return this.comErro
    }
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
