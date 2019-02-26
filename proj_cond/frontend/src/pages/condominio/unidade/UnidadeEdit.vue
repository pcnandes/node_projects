<template>
  <q-page class="justify-center pagina">
    <botoes-crud @cancelar="cancelar()" :exibeExcluir="false" labelConfirmar="Salvar" @confirmar="salvar()"
      :titulo="getTitulo" />

    <!-- moradores -->
    <q-list inset-separator no-border>
      <q-collapsible class="col-12 q-my-lg">
        <template slot="header">
          <q-item-side><q-item-tile icon="mdi-human-male-boy" color="positive" /></q-item-side><q-item-main label="Moradores" />
        </template>
        <q-list inset-separator no-border highlight v-if="unidade.moradores && unidade.moradores.length>0">
          <q-item v-for="m in unidade.moradores" :key="m.id" @click.native="prepararAlterarMorador(m)">
            <q-item-side :letter="m.tipo.substring(0,1)" color="secondary">
              <q-tooltip>{{m.tipo}}</q-tooltip>
            </q-item-side>
            <q-item-main :label="m.nome"
              :sublabel="`${m.email ? 'email: ' + m.email : ''}` + `${m.telefone ? ' Telefone: ' + m.telefone : ''}` + `${m.celular1 ? ' Celular1: ' + m.celular1 : ''}` + `${m.celular2 ? ' Celular2: ' + m.celular2 : ''}`"
            />
            <q-item-side right v-if="!m.dataDesativacao && m.responsavel" icon="mdi-human-greeting" color="primary">
              <q-tooltip>Responsável pela unidade</q-tooltip>
            </q-item-side>
            <q-item-side right  v-if="!m.dataDesativacao && m.enviarNotificacaoEmail" icon="mdi-contact-mail" color="secondary">
              <q-tooltip>Recebe notificações por email</q-tooltip>
            </q-item-side>
            <q-item-side right  v-if="m.dataDesativacao" icon="mdi-account-off" color="secondary">
              <q-tooltip>Morador desativado</q-tooltip>
            </q-item-side>
          </q-item>
        </q-list>
        <div class="row justify-center">
          <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar Morador" @click="prepararAdicionarMorador()" color="secondary"/>
        </div>
      </q-collapsible>

      <!-- Colaboradores -->
      <q-collapsible class="col-12 q-my-lg">
        <template slot="header">
          <q-item-side>
            <q-item-tile icon="mdi-worker" color="warning" />
          </q-item-side>
          <q-item-main label="Colaboradores" />
        </template>
        <q-list inset-separator no-border highlight v-if="unidade.colaboradores && unidade.colaboradores.length>0">
          <q-item v-for="c in unidade.colaboradores" :key="c.id" @click.native="prepararAlterarColaborador(c)">
            <q-item-main :label="`${c.nome}`"
              :sublabel="`Identificação: ${c.tipoDoc} - ${c.numeroDoc} Início Atividade: ${date.formatDate(c.dataInicio, 'DD/MM/YYYY')} ${c.dataFim ? 'Fim Atividade: ' + date.formatDate(c.dataFim, 'DD/MM/YYYY') : ''}`"
            />
            <q-item-side right  v-if="c.dataFim" icon="mdi-account-off" color="secondary">
              <q-tooltip>Não presta mais serviço</q-tooltip>
            </q-item-side>
          </q-item>
        </q-list>
        <div class="row justify-center">
          <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar Colaborador" @click="prepararAdicionarColaborador()" color="secondary"/>
        </div>
      </q-collapsible>

      <!-- Veículos -->
      <q-collapsible class="col-12 q-my-lg">
        <template slot="header">
          <q-item-side>
            <q-item-tile icon="mdi-car-side" color="info" />
          </q-item-side>
          <q-item-main label="Veículos" />
        </template>
        <q-list inset-separator no-border highlight v-if="unidade.veiculos && unidade.veiculos.length>0">
          <q-item v-for="v in unidade.veiculos" :key="v.id" @click.native="prepararAlterarVeiculo(v)">
            <q-item-side :letter="v.tipo.substring(0,1)" color="secondary">
              <q-tooltip>{{v.tipo}}</q-tooltip>
            </q-item-side>
            <q-item-main :label="`${v.marca} - ${v.modelo}`"
              :sublabel="`Placa: ${v.placa} Cor: ${v.cor}`"
            />
            <q-item-side right  v-if="v.dataExclusao" icon="mdi-account-off" color="secondary">
              <q-tooltip>Veículo excluído</q-tooltip>
            </q-item-side>
          </q-item>
        </q-list>
        <div class="row justify-center">
          <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar veículo" @click="prepararAdicionarVeiculo()" color="secondary"/>
        </div>
      </q-collapsible>
    </q-list>
    <!-- modais -->
    <adicionar-morador ref="moradorModal"/>
    <adicionar-colaborador ref="colaboradorModal"/>
    <adicionar-veiculo ref="veiculoModal"/>
    <!-- botoes -->
    <div class="barra-botoes">
      <q-btn label="Alterar Senha" color="secondary"/>
      <q-btn label="Zerar Senha" color="secondary"/>
    </div>
  </q-page>
</template>

<script>
import { QBtn, QField, QInput, QCollapsible, QTooltip, date } from 'quasar'
import axios from 'axios'
import BotoesCrud from '../../shared/BotoesCrud'
import AdicionarMorador from './AdicionarMorador.vue'
import AdicionarColaborador from './AdicionarColaborador.vue'
import AdicionarVeiculo from './AdicionarVeiculo.vue'
// import { PERFIS } from './../../../const'
// import { getUnidadeNew } from './../mixin.js'

export default {
  name: 'Editar_Unidade',
  components: { QBtn, QField, QInput, QCollapsible, QTooltip, date, 'botoes-crud': BotoesCrud, 'adicionar-morador': AdicionarMorador, 'adicionar-colaborador': AdicionarColaborador, 'adicionar-veiculo': AdicionarVeiculo },
  data () {
    return {
      unidade: {},
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
            if (err.response) throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
            else throw new Error(`Erro(${err})`)
          })
      }
    },
    salvar () {
      axios.put(`/api/unidade/${this.unidade.id}`, this.unidade)
        .then((res) => {
          this.unidade = res.data
          this.alertaSucesso('Unidade salva com sucesso')
        })
        .catch((err) => {
          console.error('ERRO: ', err.response.erro)
          throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
        })
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
  },
  computed: {
    getTitulo: function () {
      return this.unidade.bloco && !this.isMobile
        ? `${this.unidade.bloco.condominio.nome} | ${this.unidade.bloco.nome} | ${this.unidade.nome}`
        : this.unidade.nome
    }
  }
}
</script>
