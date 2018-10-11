<template>
  <input type="text" v-model="model" @blur="update" style="width:100%">
</template>

<script>
export default {
  props: {
    value: String
  },
  data () {
    return {
      model: null
    }
  },
  methods: {
    update () {
      if (this.model === '') {
        this.$emit('change', null);
      }
      else {
        this.$emit('change', this.model);
      }
    }
  },
  created () {
    this.model = this.value;
  }
}
</script>

<style scoped>
input {
  -webkit-appearance: none; 
  -moz-appearance: none; 
  border: 1px solid rgb(169, 169, 169);
}
</style>
