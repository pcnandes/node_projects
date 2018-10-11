<template>
  <div>
    <component :is="tipoValor" :value="valor" @change="update"></component>
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
    tipo: String,
    value: Array
  },
  computed: {
    valor () {
      if (this.value && this.value.length > 0) {
        return this.value[0];
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
    update (val) {
      val = (val !== null && val !== undefined) ? [val] : [];
      this.$emit('input', val);
    }
  }
}
</script>

<style>

</style>