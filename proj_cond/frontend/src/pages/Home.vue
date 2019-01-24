<template>
  <q-page class="flex flex-center pagina">
  <ul>
    <li>Descricao do condominio</li>
    <li>Downloads (regimento interno)</li>
    <li>Regras gerais (texto que o sindico pode editar)</li>
  </ul>
  aquiii {{isMobile}}{{getPlataforma}}
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'Home',

  data () {
    return {
    }
  },
  created () {
  },
  methods: {
  }
}
</script>
