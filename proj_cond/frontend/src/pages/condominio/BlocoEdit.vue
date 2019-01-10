<template>
  <q-page class="justify-center pagina">
    Condomínio: {{bloco.condominio.nome}}
    <q-field :count="50" >
      <q-input v-model="bloco.nome" float-label="Nome/Identificação do bloco"/>
    </q-field>
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
import { getBlocoNew } from './mixin.js'
import axios from 'axios'

export default {
  name: 'CadastroBloco',
  components: { QBtn, QField, QInput },
  data () {
    return {
      blocoId: this.$route.params.id,
      bloco: getBlocoNew()
    }
  },
  validations: {
    bloco: {
      nome: { required }
    }
  },
  methods: {
    carregarPagina () {
      if (this.condominioId) {
        // TODO PAREI AQUI.. VOU NO BANCO PEGAR O BLOCO OU PEDO DIRETO DO CONDOMINIO???? COMO PEGAR DIRETO???
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
