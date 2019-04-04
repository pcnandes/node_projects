<template>
  <q-input :value="value" :label="label" @input="updateValue" type="textarea" class="q-pa-xs q-mb-sm" v-bind:class="counter ? 'q-mb-lg' : ''"
    filled  :bg-color="bgColor" :color="color" :autofocus="autofocus"
    :rules="[val => !required || !!val]" ref="myInputTextArea"
    :readonly="readonly" :disable="disable"
    :counter="counter" :maxlength="maxLength">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-text-area',
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
    counter: { type: Boolean, required: false },
    maxLength: { required: false }
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
      this.$refs.myInputTextArea.validate()
      return this.$refs.myInputTextArea.hasError
    },
    resetValidation () {
      this.$refs.myInputTextArea.resetValidation()
    }
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
