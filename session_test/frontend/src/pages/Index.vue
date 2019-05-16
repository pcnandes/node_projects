<template>
  <q-page class="flex flex-center">
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
    {{foo}}
    {{bar}}
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      foo: null,
      bar: null
    }
  },
  created: function () {
    this.$axios.get('http://localhost:3000/bar', { withCredentials: true })
      .then((response) => {
        this.bar = response.data
        console.log('bar', response.data)
        this.$axios.get('http://localhost:3000/foo', { withCredentials: true })
          .then((response) => {
            this.foo = response.data
            console.log('foo', response.data)
          })
      })
  }
}
</script>
