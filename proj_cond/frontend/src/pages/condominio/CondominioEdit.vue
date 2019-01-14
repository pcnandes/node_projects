<template>
  <q-page class="justify-center pagina">
    <q-field :count="50">
      <q-input v-model="condominio.nome" float-label="Nome do Condomínio"
        @blur="$v.condominio.nome.$touch" :error="$v.condominio.nome.$error"/>
    </q-field>

    <q-list v-if="condominioId && condominio.blocos && condominio.blocos.length>0" highlight class="col-12 q-my-lg">
      <q-collapsible
        v-for="(bl, i) in condominio.blocos" :key="i">
        <template slot="header">
          <q-item-side>
            <q-item-tile icon="business" color="primary" />
          </q-item-side>
          <q-item-main :label="bl.nome" />
        </template>
        <div class="absolute" style="right: 0px; bottom: 0px" >
          <q-btn round flat fab-mini icon="edit" color="faded" title="Alterar Bloco" @click.native="prepararAlterarBloco(bl)"/>
          <q-btn round flat fab-mini icon="delete" color="faded" title="Excluir Bloco"/>
        </div>
        <div class="row col-12 justify-center">
            <div class="divUnidade" v-for="(unidade, y) in bl.unidades" :key="y" >
              {{unidade.nome}}
            </div>
        </div>
      </q-collapsible>
    </q-list>

    <div v-if="condominioId" class="row justify-center q-my-lg">
      <q-btn class="col-xs-12 col-md-auto" label="Adicionar bloco" @click="prepararAdicionarBloco()" color="secondary"/>
    </div>
    <div class="barra-botoes-principal row">
      <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Salvar" @click="salvar()" color="primary"/></div>
      <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Excluir" @click="excluir()" color="negative"/></div>
      <div class="row col-xs-12 col-md-auto"><q-btn class="full-width" label="Cancelar" @click="cancelar()" color="faded"/></div>
    </div>
    <adicionar-bloco ref="blocoModal">
    </adicionar-bloco>
  </q-page>
</template>

<script>
import { QBtn, QField, QInput, QCollapsible } from 'quasar'
import { required } from 'vuelidate/lib/validators'
// import Vue from 'vue'
import { getBlocoNew, getCondominioNew } from './mixin.js'
import axios from 'axios'
import AdicionarBloco from './AdicionarBloco.vue'

export default {
  name: 'CadastroCondominio',
  components: { QBtn, QField, QInput, QCollapsible, 'adicionar-bloco': AdicionarBloco },
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
      this.modalConfirmaExclusao().then(() => {
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
    },
    prepararAlterarBloco (bloco) {
      console.log(bloco)
    },
    prepararAdicionarBloco () {
      this.$refs.blocoModal.exibir()
    }
  },
  mounted () {
    this.carregarPagina()
  }
}
</script>

<style scoped>
  .divUnidade {
    position:relative;
    border: 1px solid #5a5a5a;
    min-width: 60px!important;
    max-width: 88px!important;
    margin-bottom: 5px;
    margin-right: 5px;
    text-align: center;
  }

  @media (max-width: 575px) {
    .divUnidade {
      margin-bottom: 2px;
      margin-right: 2px;
      min-width: 60px!important;;
      max-width: 70px!important;;
    }
  }
</style>
