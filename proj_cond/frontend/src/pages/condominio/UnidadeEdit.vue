<template>
  <q-page class="justify-center pagina">
    <botoes-crud @cancelar="cancelar()"
      :titulo="`${unidade.Bloco.Condominio.nome} -> ${unidade.Bloco.nome} -> ${unidade.nome}`" />
      unidade: {{unidade}}
  </q-page>
</template>

<script>
import axios from 'axios'
import BotoesCrud from '../shared/BotoesCrud'

export default {
  name: 'Editar_Unidade',
  components: { 'botoes-crud': BotoesCrud },
  data () {
    return {
      unidade: { nome: 'unidadeee' },
      unidadeId: this.$route.params.unidadeId
    }
  },
  methods: {
    carregarPagina () {
      if (this.unidadeId) {
        axios.get(`/api/unidade/${this.unidadeId}`)
          .then((res) => {
            this.unidade = res.data
          })
          .catch((err) => {
            throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
          })
      }
    },
    salvar () {
    },
    cancelar () {
      this.$router.push('/condominio')
    }
  },
  mounted () {
    this.carregarPagina()
  }
}
</script>
