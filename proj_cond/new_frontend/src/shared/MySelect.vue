<template>
<div>
 <!-- <q-select
        filled
        :value="value" @input="updateValue"
        :options="options"
        :option-value="optionValue"
        :option-label="optionLabel"
        :map-options="mapOptions"
        :label="label"
        ref="mySelect"
      /> -->
  <q-select :value="value" @input="updateValue" ref="mySelect" class="q-pa-xs q-mb-sm"
    :options="options" :label="label" :autofocus="autofocus"
    filled :bg-color="bgColor" :color="color" transition-show="scale" transition-hide="scale"
    :rules="[val => !required || !!val]" :option-label="optionLabel" :option-value="optionValue"
    :emit-value="emitValue" :map-ptions="mapOptions"
    :readonly="readonly" :disable="disable">
    <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
    </template>
    <template v-slot:after>
      <slot name="depois_fora"></slot>
    </template>
  </q-select>
</div>
</template>

<script>
export default {
  name: 'my-select',
  props: {
    label: { type: String, required: true },
    value: { required: true },
    bgColor: { required: false, default: 'grey-5' },
    color: { required: false, default: 'blue-grey-14' },
    options: { type: Array, required: true },
    optionLabel: { required: false },
    optionValue: { required: false },
    emitValue: { type: Boolean, required: false },
    mapOptions: { type: Boolean, required: false },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    icon: { type: String, required: false },
    readonly: { type: Boolean, required: false },
    disable: { type: Boolean, required: false }
  },
  data () {
    return {
    }
  },
  methods: {
    updateValue (itemSelect) {
      this.$emit('input', itemSelect)
    },
    hasError () {
      this.$refs.mySelect.validate()
      return this.$refs.mySelect.hasError
    },
    resetValidation () {
      this.$refs.mySelect.resetValidation()
    }
  },
  mounted () {
    this.valor = this.value
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
