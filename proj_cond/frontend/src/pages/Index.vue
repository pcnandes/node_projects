<template>
  <q-page class="flex flex-center">

    teste{{lista}}
    <img alt="Quasar logo" src="~assets/quasar-logo-full.svg">
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      lista: []
    }
  },
  created () {
    this.listar()
  },
  methods: {
    listar () {
      this.$axios.get('/public/lista')
        .then((response) => {
          console.log(response)
          this.lista = response.data
        })
        .catch(() => {
          this.$q.notify({
            color: 'negative',
            position: 'top',
            message: 'Loading failed',
            icon: 'report_problem'
          })
        })
    }
  }
}
</script>
