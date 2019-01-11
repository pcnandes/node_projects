<template>
  <q-page class="justify-center pagina">
      <q-list v-if="condominios.length>0" highlight class="col-12">
        <q-list-header>Condomínios cadastrados</q-list-header>
        <q-item v-for="c in condominios" :key="c.id" @click.native="detalhar(c)">
          <q-item-side>
            <q-item-tile icon="business" color="primary" />
          </q-item-side>
          <q-item-main :label="c.nome" />
        </q-item>
      </q-list>
      <p v-else>Nenhum condomínio cadastrado</p>
      <div class="barra-botoes row">
        <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Cadastrar Condomínio" @click="novo()" color="secondary"/></div>
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
