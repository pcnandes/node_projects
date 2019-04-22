<template>
  <q-select :value="value" @input="updateValue" ref="mySelect"
    class="col-12 q-pa-xs q-mb-md" bottom-slots v-bind:class="!noSpaces ? 'q-pa-xs q-mb-sm' : ''"
    :options="options" :label="label" :autofocus="autofocus"
    filled :bg-color="bgColor" :color="color" transition-show="scale" transition-hide="scale"
    :option-label="optionLabel" :option-value="optionValue"
    :emit-value="emitValue" :map-ptions="mapOptions"
    :readonly="readonly" :disable="disable"
    @blur="hasError()" :error="!isValid" :error-message="errorMessage">
    <template v-if="icon" v-slot:prepend>
        <q-icon :name="icon" />
    </template>
    <template v-slot:after>
      <slot name="depois_fora"></slot>
    </template>
  </q-select>
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
    disable: { type: Boolean, required: false },
    noSpaces: { type: Boolean, required: false, default: false }
  },
  data () {
    return {
      // erros: [],
      // erroRequired: false
      errorMessage: null
    }
  },
  methods: {
    updateValue (itemSelect) {
      this.$emit('input', itemSelect)
    },
    // verifica se o campo possui erros e imprime os erros específicos do mesmo
    /* trataErro () {
      this.hasError()
      this.erros.forEach(e => this.alertaErro(e))
    }, */
    hasError () {
      this.errorMessage = null
      if (this.required && !this.value) this.errorMessage = 'Campo obrigatório!'
    },
    resetValidation () {
      // this.$refs.mySelect.resetValidation()
      this.errorMessage = null
      if (this.required && !this.value) this.errorMessage = 'Campo obrigatório!'
      this.errorMessage = null
    }
  },
  // mounted () {
  //  this.valor = this.value
  // },
  computed: {
    isValid: function () {
      // return !this.erroRequired && this.erros.length === 0
      return !this.errorMessage
    }
  }
}
</script>
<style scoped>
</style>
