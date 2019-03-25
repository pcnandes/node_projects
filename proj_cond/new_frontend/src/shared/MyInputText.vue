<template>
  <q-input v-model.trim="valor" :label="label" @input="updateValue()"
    filled  bg-color="grey-5" color="blue-grey-14" :autofocus="autofocus"
    :rules="[val => !required || !!val]" ref="myInputText">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  props: {
    label: { type: String, required: true },
    value: { required: true },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    icon: { type: String, required: false }
  },
  data () {
    return {
      valor: this.value
    }
  },
  methods: {
    updateValue () {
      this.$emit('input', this.valor)
    },
    hasError () {
      this.$refs.myInputText.validate()
      return this.$refs.myInputText.hasError
    }
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
