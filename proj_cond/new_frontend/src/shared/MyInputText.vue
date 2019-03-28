<template>
  <q-input :value="value" :label="label" @input="updateValue" class="col-12"
    filled  bg-color="grey-5" color="blue-grey-14" :autofocus="autofocus"
    :rules="[val => !required || !!val]" ref="myInputText">
    <template v-if="icon" v-slot:prepend>
      <q-icon :name="icon" />
    </template>
  </q-input>
</template>

<script>
export default {
  name: 'my-input-text',
  props: {
    label: { type: String, required: true },
    value: { required: true },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    icon: { type: String, required: false }
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
