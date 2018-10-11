<template>
  <div>
    <select v-model="operador" @change="update">
      <option v-for="o in operadores" :key="o" :value="o">{{o}}</option>
    </select>
    <input v-model="valor" @blur="update" size="4">
    <select v-model="unidade" v-if="unidades" @change="update">
      <option v-for="u in unidades" :key="u.value" :value="u.value">{{u.label}}</option>
    </select>
  </div>
</template>

<script>
export default {
  props: {
    value: String,
    tipo: String
  },
  data () {
    return {
      operador: '+',
      valor: null,
      unidade: null,
      operadores: ['+', '-'],
      unidades: null
    }
  },
  methods: {
    /**
     * Monta o valor do complemento em uma string e notifica o evento de mudança de valor
     */
    update () {
      let val = null;
      if (this.valor && this.valor !== '' && this.operador && (!this.unidades || (this.unidade && this.unidade !== ''))) {
        val = this.operador + this.valor + (this.unidades ? this.unidade : '');
      }
      this.$emit('input', val);
    }
  },
  created () {
    // inclui operadores de multiplicação e divisão dependendo do tipo do filtro
    if (['PERCENT', 'DOUBLE', 'INTEGER'].indexOf(this.tipo) >= 0) {
      this.operadores.push('*');
      this.operadores.push('/');
    }
    // inclui unidades de medida para filtros do tipo data
    if (['DATE', 'TIMESTAMP'].indexOf(this.tipo) >= 0) {
      this.unidades = [
        {value: 'd', label: 'dias'},
        {value: 'w', label: 'semanas'},
        {value: 'm', label: 'meses'},
        {value: 'y', label: 'anos'}
      ];
      this.unidade = this.unidades[0].value;
    }
    // TODO: interpretar a propriedade value para obter o operador, valor e unidade
  }
}
</script>

<style>
</style>
