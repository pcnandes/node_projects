<template>
  <q-page class="justify-center pagina">
    <botoes-crud @cancelar="cancelar()" :exibeExcluir="false" labelConfirmar="Salvar"
      :titulo="`${unidade.bloco.condominio.nome} -> ${unidade.bloco.nome} -> ${unidade.nome}`" />

    <q-list inset-separator no-border>
      <q-collapsible class="col-12 q-my-lg">
        <template slot="header">
          <q-item-side>
            <q-item-tile icon="mdi-human-male-boy" color="positive" />
          </q-item-side>
          <q-item-main label="Moradores" />
        </template>
        <div class="row justify-center">
          <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar Morador" @click="prepararAdicionarMorador()" color="secondary"/>
        </div>
      </q-collapsible>

      <q-collapsible class="col-12 q-my-lg">
        <template slot="header">
          <q-item-side>
            <q-item-tile icon="mdi-worker" color="warning" />
          </q-item-side>
          <q-item-main label="Colaboradores" />
        </template>
        <div class="row justify-center">
          <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar Colaborador" @click="prepararAdicionarColaborador()" color="secondary"/>
        </div>
      </q-collapsible>

      <q-collapsible class="col-12 q-my-lg">
        <template slot="header">
          <q-item-side>
            <q-item-tile icon="mdi-car-side" color="info" />
          </q-item-side>
          <q-item-main label="Veículos" />
        </template>
        <div class="row justify-center">
          <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar veículo" @click="prepararAdicionarVeiculo()" color="secondary"/>
        </div>
      </q-collapsible>
    </q-list>
    <!-- modais -->
    <adicionar-morador ref="moradorModal"/>
    <adicionar-colaborador ref="colaboradorModal"/>
    <adicionar-veiculo ref="veiculoModal"/>
  </q-page>
</template>

<script>
import { QBtn, QField, QInput, QCollapsible } from 'quasar'
import axios from 'axios'
import BotoesCrud from '../../shared/BotoesCrud'
import AdicionarMorador from './AdicionarMorador.vue'
import AdicionarColaborador from './AdicionarColaborador.vue'
import AdicionarVeiculo from './AdicionarVeiculo.vue'

export default {
  name: 'Editar_Unidade',
  components: { QBtn, QField, QInput, QCollapsible, 'botoes-crud': BotoesCrud, 'adicionar-morador': AdicionarMorador, 'adicionar-colaborador': AdicionarColaborador, 'adicionar-veiculo': AdicionarVeiculo },
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
    },
    async prepararAlterarMorador (morador) {
      let _morador = await this.$refs.moradorModal.prepararAlteracao(morador)
      Object.assign(morador, _morador)
    },
    async prepararAdicionarMorador () {
      let _morador = await this.$refs.moradorModal.prepararInclusao()
      this.unidade.moradores.push(_morador)
    },
    async prepararAlterarColaborador (colaborador) {
      let _colaborador = await this.$refs.colaboradorModal.prepararAlteracao(colaborador)
      Object.assign(colaborador, _colaborador)
    },
    async prepararAdicionarColaborador () {
      let _colaborador = await this.$refs.colaboradorModal.prepararInclusao()
      this.unidade.colaboradores.push(_colaborador)
    },
    async prepararAlterarVeiculo (veiculo) {
      let _veiculo = await this.$refs.veiculoModal.prepararAlteracao(veiculo)
      Object.assign(veiculo, _veiculo)
    },
    async prepararAdicionarVeiculo () {
      let _veiculo = await this.$refs.veiculoModal.prepararInclusao()
      this.unidade.veiculos.push(_veiculo)
    }
  },
  mounted () {
    this.carregarPagina()
  }
}
</script>
