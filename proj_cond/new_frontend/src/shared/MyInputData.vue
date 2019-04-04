<template>
  <q-input :value="dataFormatada" @input="updateValue" :label="label" class="q-pa-xs q-mb-sm"
    filled :bg-color="bgColor" :color="color" :autofocus="autofocus" ref="myInputData"
    :rules="[val => !val || dataValida(val) , val => !required || !!val]" :readonly="readonly" :disable="disable">
    <template v-slot:append>
      <q-icon name="event" class="cursor-pointer">
        <q-popup-proxy ref="myInputDataProx">
          <q-date :value="dataFormatadaComData" @input="updateValue" minimal/>
        </q-popup-proxy>
      </q-icon>
    </template>
  </q-input>
</template>

<script>

import { date } from 'quasar'

export default {
  name: 'my-input-data',
  props: {
    label: { type: String, required: true },
    value: { required: true },
    bgColor: { required: false, default: 'grey-5' },
    color: { required: false, default: 'blue-grey-14' },
    autofocus: { type: Boolean, required: false },
    required: { type: Boolean, required: false },
    readonly: { type: Boolean, required: false },
    disable: { type: Boolean, required: false }
  },
  data () {
    return {
    }
  },
  methods: {
    updateValue (itemValue) {
      this.$refs.myInputDataProx.hide()
      this.$emit('input', new Date(itemValue))
    },
    hasError () {
      this.$refs.myInputData.validate()
      return this.$refs.myInputData.hasError
    },
    dataValida (data) {
      let _data = JSON.stringify(data)
      return date.isValid(_data)
    }
  },
  computed: {
    dataFormatada: function () {
      return date.formatDate(this.value, 'DD/MM/YYYY')
    },
    dataFormatadaComData: function () {
      return date.formatDate(this.value, 'YYYY/MM/DD')
    }
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
</style>
