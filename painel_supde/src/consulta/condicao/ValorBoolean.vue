<template>
  <div>
    <label><input type="radio" v-model="model" name="bool" value="true" @change="update"> Sim</label>
    &nbsp;
    <label><input type="radio" v-model="model" name="bool" value="false" @change="update"> Não</label>
  </div>
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
      this.$emit('change', this.model);
    }
  },
  created () {
    this.model = this.value;
  }
}
</script>

<style scoped>
</style>
