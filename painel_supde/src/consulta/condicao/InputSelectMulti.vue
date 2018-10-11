<template>
  <select multiple v-model="model" style="width:100%; height:8em; overflow:auto; font-size:.9em" @change="update">
    <option v-for="x in valores" :key="x" :value="x" @dblclick="detalhar()">{{x}}</option>
  </select>
</template>

<script>
export default {
  props: {
    value: Array,
    valores: Array
  },
  data () {
    return {
      model: this.value
    }
  },
  methods: {
    detalhar () {
      this.$emit('detalhar');
    },
    update () {
      this.$emit('input', this.model);
    }
  },
  watch: {
    value (newValue) {
      if (newValue !== this.model) {
        this.model = newValue;
      }
    }
  }
}
</script>

<style>

</style>
