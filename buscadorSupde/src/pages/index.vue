<template>
  <q-page class="pagina" style="width: 100%;">
    <div class="pesquisa">
      <h1 class="q-display-1 text-dark">Do que você precisa?</h1>
      <div class="row">
        <q-search
          style="width:80%"
          type="text"
          autofocus
          inverted
          color="grey-6"
          placeholder="Digite o que precisa pesquisar..."
          clearable
          hide-underline
          v-model="pesquisa"
          :before="[{icon:''}]"
          @keyup.enter="pesquisar"
        >
        <!--<q-autocomplete @search="search" @selected="selected" sublabelLines="2"/> -->
        </q-search>
        <q-btn color="indigo-4" icon="search" title="Pesquisa Avançada"
            @click="pesquisar"/>
      </div>
    </div>
    <!--
    <resultado-pesquisa :resultado="resultado"></resultado-pesquisa>
    -->
  </q-page>
</template>

<script>

export default {
  name: 'PageIndex',
  data () {
    return {
      pesquisa: ''
    }
  },
  methods: {
    pesquisar () {
      console.log('pesquisar')
      console.log(this.pesquisa)
      if (this.pesquisa) {
        this.$router.push(`/resultado/${this.pesquisa}`)
      }
    }
  }
}
</script>

<style>
  .pesquisa {
    padding-top: 7%;
    padding-left: 7%;
  }
  .chips {
    margin-left: 10%;
  }
  .chips a:link, a:visited, a:hover, a:active {
    text-decoration: none;
    color: white;
  }
  .filtrosPesquisa {
    padding-left: 7%;
    margin-top: 20px;
  }
</style>
