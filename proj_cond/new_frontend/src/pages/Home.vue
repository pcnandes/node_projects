<template>
  <q-page class="flex flex-center pagina">
  <ul>
    <li>Avisos gerais</li>
    <li>Descricao do condominio</li>
    <li>Downloads (regimento interno)</li>
    <li>Regras gerais (texto que o sindico pode editar)</li>
  </ul>
  </q-page>
</template>

<style>
</style>

<script>

// import { PERFIS } from './../const'

export default {
  name: 'Home',

  data () {
    return {
    }
  },
  methods: {
    /* carregarPagina () {
      if (!this.possuiPerfil(PERFIS.ADMINISTRADOR)) {
        let navItens = [{ label: this.getUsuarioLogado.unidade.bloco.condominio.nome, uri: this.$router.currentRoute.path }]
        this.setNavItens(navItens)
        // TODO listar informações do condominio
      }
    } */
  },
  mounted () {
    // this.carregarPagina()
  }
}
</script>
