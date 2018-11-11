<template>
  <q-page class="flex flex-center pagina">
  <ul>
    <li>Descricao do condominio</li>
    <li>Downloads (regimento interno)</li>
    <li>Regras gerais (texto que o sindico pode editar)</li>
  </ul>
    teste{{lista}}
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Home',

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
      this.$axios.get('/lista_sec')
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
