<template>
  <div>
    <component :is="tipoValor" :value="valor1" @change="update1"></component>
    <div align="center">até</div>
    <component :is="tipoValor" :value="valor2" @change="update2"></component>
  </div>
</template>

<script>
import ValorBoolean from './ValorBoolean.vue'
import ValorDate from './ValorDate.vue'
import ValorDouble from './ValorDouble.vue'
import ValorInteger from './ValorInteger.vue'
import ValorPercent from './ValorPercent.vue'
import ValorString from './ValorString.vue'

export default {
  components: {
    ValorBoolean, ValorDate, ValorDouble, ValorInteger, ValorPercent, ValorString
  },
  props: {
    value: Array,
    tipo: String
  },
  computed: {
    valor1 () {
      if (this.value && this.value.length > 0) {
        return this.value[0];
      }
      return null;
    },
    valor2 () {
      if (this.value && this.value.length > 1) {
        return this.value[1];
      }
      return null;
    },
    tipoValor () {
      switch (this.tipo) {
        case 'DATE':
        case 'TIMESTAMP': return 'ValorDate';
        case 'BOOLEAN': return 'ValorBoolean';
        case 'DOUBLE': return 'ValorDouble';
        case 'INTEGER': return 'ValorInteger';
        case 'PERCENT': return 'ValorPercent';
        default: return 'ValorString';
      }
    }
  },
  methods: {
    update1 (v) {
      this.$emit('input', [v, this.valor2]);
    },
    update2 (v) {
      this.$emit('input', [this.valor1, v]);
    }
  }
}
</script>

<style>

</style>
