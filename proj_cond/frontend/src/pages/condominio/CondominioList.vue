<template>
  <q-page class="justify-center pagina">
    <div class="formulario">
      <q-list highlight class="col-12">
        <q-list-header>Condomínios cadastrados</q-list-header>
        <q-item v-for="c in condominios" :key="c.id" @click.native="detalhar(c)">
          <q-item-side>
            <q-item-tile icon="business" color="primary" />
          </q-item-side>
          <q-item-main :label="c.nome" />
          <q-item-side right>
            <q-btn flat round dense icon="clear">
            </q-btn>
          </q-item-side>
        </q-item>
      </q-list>
      <div class="barra-botoes row">
        <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Adicionar Condomínio" @click="novo()" color="secondary"/></div>
      </div>
    </div>
    <div class="barra-botoes-principal row">
      <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Confirmar" color="primary"/></div>
      <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Cancelar" color="primary"/></div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Lista_condominio',
  data () {
    return {
      condominios: []
    }
  },
  methods: {
    listarCondominios () {
      axios.get('/api/condominio')
        .then((res) => {
          this.condominios = res.data
        })
        .catch((err) => {
          console.error('ERRO: ', err.response.erro, err.erro)
          throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
        })
    },
    detalhar (condominio) {
      this.$router.push('/condominio/' + condominio.id)
    },
    novo () {
      this.$router.push('/condominio/novo')
    }
  },
  mounted () {
    this.listarCondominios()
  }
}
</script>

<style>

</style>
