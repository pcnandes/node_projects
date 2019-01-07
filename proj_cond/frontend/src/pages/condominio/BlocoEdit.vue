<template>
  <q-page class="justify-center pagina">
    <div class="formulario">
      <q-field :count="50" >
        <q-input v-model="condominio.nome" float-label="Nome do Condomínio"/>
      </q-field>
      <q-list highlight class="col-12">
        <q-list-header>Blocos</q-list-header>
        <q-item v-for="b in condominio.blocos" :key="b.id" @click.native="detalhar(b)">
          <q-item-side>
            <q-item-tile icon="business" color="primary" />
          </q-item-side>
          <q-item-main :label="b.nome" />
        </q-item>
      </q-list>

    </div>
    <div class="barra-botoes-principal row">
      <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Salvar" color="primary"/></div>
      <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Cancelar" color="faded"/></div>
    </div>
  </q-page>
</template>

<script>
import { QBtn, QField, QInput } from 'quasar'
import { required } from 'vuelidate/lib/validators'
// import Vue from 'vue'
import { getBlocoNew, getCondominioNew } from './mixin.js'
import axios from 'axios'

export default {
  name: 'CadastroCondominio',
  components: { QBtn, QField, QInput },
  data () {
    return {
      condominioId: this.$route.params.id,
      bloco: getBlocoNew(),
      condominio: getCondominioNew()
    }
  },
  validations: {
    form: {
      condominio: { required }
    }
  },
  methods: {
    carregarPagina () {
      if (this.condominioId) {
        axios.get(`/api/condominio/${this.condominioId}`)
          .then((res) => {
            this.condominio = res.data
          })
          .catch((err) => {
            console.error('ERRO: ', err.response.erro, err.erro)
            throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
          })
      }
    },
    salvar () {
      if (!this.condominio.id) {
        axios.post('/api/condominio', this.condominio)
          .then((res) => {
            this.condominio = res.data
          })
          .catch((err) => {
            console.error('ERRO: ', err.response.erro)
            throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
          })
      } else {
        axios.put(`/api/condominio/${this.condominio.id}`, this.condominio)
          .then((res) => {
            this.condominio = res.data
          })
          .catch((err) => {
            throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
          })
      }
    },
    cancelar () {
      this.$router.go(-1)
    },
    detalharBloco (blocoId) {
      this.$router.push('/bolco/' + blocoId)
    },
    adicionarBloco () {
      this.$router.push('/bloco/novo')
    }
  },
  mounted () {
    this.carregarPagina()
  }
}
</script>

<style>
</style>
