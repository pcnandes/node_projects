<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-sm"
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus"
    :rules="[val => !required || !!val]" ref="myInputRg"
    :readonly="readonly" :disable="disable" mask="##############">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-rg',
  props: {
    label: { type: String, required: false, default: 'RG' },
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
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$emit('input', itemValue)
    },
    hasError () {
      this.$refs.myInputRg.validate()
      return this.$refs.myInputRg.hasError
    },
    resetValidation () {
      this.$refs.myInputRg.resetValidation()
    }
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
