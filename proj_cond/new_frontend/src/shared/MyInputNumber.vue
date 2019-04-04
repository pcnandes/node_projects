<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-sm"
    filled  :bg-color="bgColor" :color="color" :autofocus="autofocus"
    :rules="[val => !required || !!val]" ref="myInputNumber"
    :readonly="readonly" :disable="disable" :mask="mascara">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-number',
  props: {
    label: { type: String, required: true },
    value: { required: true },
    bgColor: { required: false, default: 'grey-5' },
    color: { required: false, default: 'blue-grey-14' },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    icon: { type: String, required: false },
    readonly: { type: Boolean, required: false },
    disable: { type: Boolean, required: false },
    maxLength: { type: Number, required: false, default: 9 }
  },
  data () {
    return {
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$emit('input', itemValue)
    },
    hasError () {
      this.$refs.myInputNumber.validate()
      return this.$refs.myInputNumber.hasError
    },
    resetValidation () {
      this.$refs.myInputNumber.resetValidation()
    }
  },
  computed: {
    mascara: function () {
      let retorno = ''
      for (let i = 0; i < this.maxLength; i++) {
        retorno += '#'
      }
      return retorno
    }
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
