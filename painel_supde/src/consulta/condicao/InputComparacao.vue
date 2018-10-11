<template>
  <select v-model="model" @change="update">
    <option v-for="x in valores" :key="x.value" :value="x.value">{{x.label}}</option>
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
      model: null
    }
  },
  methods: {
    update () {
      const val = this.model !== null && this.model !== undefined ? [this.model] : [];
      this.$emit('input', val);
    }
  },
  created () {
    if (this.value && this.value.length > 0) {
      this.model = this.value[0];
      if (this.value.length > 1) {
        this.update();
      }
    }
  }
}
</script>

<style>

</style>
