<template>
  <q-datetime
    :stack-label="label"
    v-model="valorData" type="datetime"
    format="DD/MM/YYYY HH:mm:ss"
    :month-names="meses"
    :day-names="dias"
    ok-label="Ok"
    clear-label="Limpar"
    cancel-label="Cancelar"
    @input="onChange"
    :disable = "disable"
    @blur="onBlur"
    :error="error"
    />
</template>

<script>
import { QDatetime } from 'quasar'
export default {
  components: {
    QDatetime
  },
  props: {
    value: {required: true},
    label: {required: true, type: String},
    disable: {required: false, type: Boolean},
    error: {required: false}
  },
  data () {
    return {
      meses: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
      dias: ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado', 'Domingo'],
      valorData: this.value
    }
  },
  watch: {
    value: function (newVal) {
      this.valorData = newVal;
    }
  },
  methods: {
    onChange () {
      this.$emit('input', this.valorData);
    },
    onBlur () {
      console.log('enbtrou');
      this.$emit('blur');
    }
  }
}
</script>
<style scoped>
</style>
