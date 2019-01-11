<template>
  <q-page class="justify-center pagina">
    <q-field :count="50">
      <q-input v-model="condominio.nome" float-label="Nome do Condomínio"
        @blur="$v.condominio.nome.$touch" :error="$v.condominio.nome.$error"/>
    </q-field>
    <q-list v-if="condominioId && condominio.blocos && condominio.blocos.length>0" highlight class="col-12 q-my-lg">
      <q-list-header>Blocos</q-list-header>
      <q-item v-for="b in condominio.blocos" :key="b.id" @click.native="detalharBloco(b.id)">
        <q-item-side>
          <q-item-tile icon="business" color="primary" />
        </q-item-side>
        <q-item-main :label="b.nome" />
      </q-item>
    </q-list>
    <div v-if="condominioId" class="row justify-center q-my-lg">
      <q-btn class="col-xs-12 col-md-auto" label="Adicionar bloco" @click="adicionarBloco()" color="secondary"/>
    </div>
    <div class="barra-botoes-principal row">
      <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Salvar" @click="salvar()" color="primary"/></div>
      <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Excluir" @click="excluir()" color="negative"/></div>
      <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Cancelar" @click="cancelar()" color="faded"/></div>
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
    condominio: {
      nome: { required }
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
      this.$v.condominio.nome.$touch()
      if (this.$v.condominio.nome.$error) {
        this.$q.notify({
          color: 'negative',
          position: 'top',
          message: 'Informe o nome do Condomínio',
          icon: 'report_problem'
        })
      }
      if (!this.condominio.id) {
        axios.post('/api/condominio', this.condominio)
          .then((res) => {
            this.condominio = res.data
            this.condominioId = res.data.id
            this.$router.push({ path: `/condominio/${this.condominioId}` })
            this.carregarPagina()
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
      this.$router.push('/condominio')
    },
    excluir () {
      this.$q.dialog({
        title: 'Confirma exclusão?',
        ok: 'Confirmar',
        cancel: 'Cancelar'
      }).then(() => {
        axios.delete(`/api/condominio/${this.condominio.id}`)
          .then((res) => {
            this.$q.notify('Condomínio excluído com sucesso!')
            this.cancelar()
          })
          .catch((err) => {
            throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
          })
      }).catch(() => {})
    },
    detalharBloco (blocoId) {
      this.$router.push(`${this.condominio.id}/bloco/${blocoId}`)
    },
    adicionarBloco () {
      this.$router.push(`${this.condominio.id}/bloco/novo`)
    }
  },
  mounted () {
    this.carregarPagina()
  }
}
</script>

<style>
</style>
