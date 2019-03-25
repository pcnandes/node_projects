<template>
  <q-page class="justify-center pagina">
    <q-field class="col-12 q-mb-xl" icon="mdi-domain">
      <q-select v-model="condominioSelecionado" float-label="Selecione um condomínio" :options="condominios" />
    </q-field>
    <div v-show="condominioSelecionado">
      <q-list v-if="funcionarios.length>0" highlight class="col-12">
        <q-list-header>Funcionários cadastrados</q-list-header>
        <q-item v-for="f in funcionarios" :key="f.id" @click.native="detalhar(f)">
          <q-item-side>
            <q-item-tile icon="mdi-account" color="primary" />
          </q-item-side>
          <q-item-main :label="f.nome" />
        </q-item>
      </q-list>
      <p v-else>Nenhum funcionario cadastrado para o codomínio selecionado</p>
      <div class="barra-botoes">
        <q-btn icon="mdi-account-plus" label="Novo Usuário" @click="novo()" color="secondary"/>
      </div>
    </div>
  </q-page>
</template>

<script>
import axios from 'axios'
import { QBtn, QField, QInput, QSelect } from 'quasar'

export default {
  name: 'Lista_usuario',
  components: {
    QBtn, QField, QInput, QSelect
  },
  data () {
    return {
      funcionarios: [],
      condominios: [],
      condominioSelecionado: null
    }
  },
  methods: {
    carregarCondominios (idCondominio) {
      if (!idCondominio) {
        axios.get('/api/condominio')
          .then((res) => {
            this.condominios = res.data.map(i => ({value: i.id, label: i.nome}))
          })
      } else {
        axios.get(`/api/condominio/${idCondominio}`)
          .then((res) => {
            this.condominios = res.data.map(i => ({value: i.id, label: i.nome}))
          })
      }
    },
    listarfuncionarios () {
      axios.get('/api/usuario')
        .then((res) => {
          this.funcionarios = res.data
        })
        .catch((err) => console.error('ERRO: ', err.response.erro, err.erro))
    },
    detalhar (usuario) {
      this.$router.push('/cadastro_funcionario/' + usuario.id)
    },
    novo () {
      this.$router.push('/cadastro_funcionario/novo')
    }
  },
  mounted () {
    this.condominioSelecionado = this.getCondominioUsuarioLogado()
    this.carregarCondominios(this.condominioSelecionado)
  }
}
</script>
