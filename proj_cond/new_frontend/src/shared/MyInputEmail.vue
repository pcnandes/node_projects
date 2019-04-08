<template>
  <q-input :value="value" :label="label" @input="updateValue" class="q-pa-xs q-mb-sm" v-bind:class="counter ? 'q-mb-lg' : ''"
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus" type="email"
    :rules="[val => !required || !!val]" @blur="testaEmail()" ref="myInputEmail"
    :readonly="readonly" :disable="disable"
    :error="!isValid" :counter="counter" :maxlength="maxLength">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-email',
  props: {
    label: { type: String, required: false, default: 'Email' },
    value: { required: true },
    bgColor: { required: false, default: 'grey-5' },
    color: { required: false, default: 'blue-grey-14' },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    icon: { type: String, required: false, default: 'mdi-email' },
    readonly: { type: Boolean, required: false },
    disable: { type: Boolean, required: false },
    counter: { type: Boolean, required: false },
    maxLength: { required: false }
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
    testaCPF (mail) {
      mail = !mail ? this.value : mail
      var regexInvalixMail = /^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{1,3})+$/g
      if (regexInvalixMail.test(mail)) {
        this.isValid = false
        return false
      }
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
