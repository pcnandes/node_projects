<template>
  <q-input v-model.trim="valor" :label="label" :type="isPwd ? 'password' : 'text'" @input="updateValue()"
    filled bg-color="grey-5" color="blue-grey-14" :autofocus="autofocus"
    :rules="[val => !required || !!val]" ref="myInputPass">
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
  props: {
    label: { type: String, required: false, default: 'Senha' },
    value: { required: true },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false }
  },
  data () {
    return {
      isPwd: true,
      valor: this.value
    }
  },
  methods: {
    updateValue () {
      this.$emit('input', this.valor)
    },
    hasError () {
      this.$refs.myInputPass.validate()
      return this.$refs.myInputPass.hasError
    }
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
