<template>
  <q-page class="justify-center pagina">
    <botoes-crud @cancelar="cancelar()" :exibeExcluir="false" labelConfirmar="Salvar" @confirmar="salvar()"
      :titulo="getTitulo" />
    <!-- moradores -->
    <q-list inset-separator no-border>
      <q-expansion-item class="col-12 q-my-lg">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-human-male-boy" color="positive" text-color="white" />
          </q-item-section>
          <q-item-section>
            Moradores
          </q-item-section>
          <q-item-section side v-if="possuiPerfis(['ADMIN', 'SINDICO']) && unidade.moradores && unidade.moradores.length>0">
            <q-checkbox v-model="exibeMoradoresInativos" label="Exibe excluídos" />
            <q-tooltip>Exibe moradores anteriores da unidade</q-tooltip>
          </q-item-section>
        </template>

        <q-list inset-separator no-border highlight v-if="unidade.moradores && unidade.moradores.length>0">
          <q-item v-for="m in getMoradores" :key="m.id" @click.native="prepararAlterarMorador(m)">
            <q-item-side :letter="m.tipo.substring(0,1)" color="secondary">
              <q-tooltip>{{m.tipo}}</q-tooltip>
            </q-item-side>
            <q-item-main :label="m.nome"
              :sublabel="`${m.dataCriacao ? 'Cadastro: ' + formataData(m.dataCriacao) : ''} ${m.dataExclusao ? 'Exclusao: ' + formataData(m.dataExclusao) : ''} ${m.email ? 'email: ' + m.email : ''}` + `${m.telefone ? ' Telefone: ' + m.telefone : ''}` + `${m.celular1 ? ' Celular1: ' + m.celular1 : ''}` + `${m.celular2 ? ' Celular2: ' + m.celular2 : ''}`"
            />
            <q-item-side right v-if="!m.dataExclusao && m.responsavel" icon="mdi-human-greeting" color="primary">
              <q-tooltip>Responsável pela unidade</q-tooltip>
            </q-item-side>
            <q-item-side right  v-if="!m.dataExclusao && m.enviarNotificacaoEmail" icon="mdi-contact-mail" color="secondary">
              <q-tooltip>Recebe notificações por email</q-tooltip>
            </q-item-side>
            <q-item-side right  v-if="m.dataExclusao" icon="mdi-cancel" color="fadded">
              <q-tooltip>Morador excluídp</q-tooltip>
            </q-item-side>
          </q-item>
        </q-list>
        <div class="row justify-center">
          <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar Morador" @click="prepararAdicionarMorador()" color="secondary"/>
        </div>
      </q-expansion-item>

      <!-- Colaboradores -->
      <q-expansion-item class="col-12 q-my-lg">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-worker" color="warning" text-color="white" />
          </q-item-section>
          <q-item-section>
            Colaboradores
          </q-item-section>
          <q-item-section side v-if="unidade.colaboradores && unidade.colaboradores.length>0">
            <q-checkbox v-model="exibeColaboradoresInativos" label="Exibe Excluídos" />
            <q-tooltip>Exibe colaboradores inativos</q-tooltip>
          </q-item-section>
        </template>

        <q-list inset-separator no-border highlight v-if="unidade.colaboradores && unidade.colaboradores.length>0">
          <q-item v-for="c in getColaboradores" :key="c.id" @click.native="prepararAlterarColaborador(c)">
            <q-item-side :letter="`${c.dataFim && maiorData(c.dataFim, new Date()) ? 'I' : 'A'}`" color="secondary">
              <q-tooltip>{{c.dataFim && maiorData(c.dataFim, new Date()) ? 'Colaborador Inativo' : 'Colaborador Ativo'}}</q-tooltip>
            </q-item-side>
            <q-item-main :label="`${c.nome}`"
              :sublabel="`Início Atividade: ${formataData(c.dataInicio)} ${c.dataFim ? 'Fim Atividade: ' + formataData(c.dataFim) : ''} ${c.tipoDoc}: ${c.numeroDoc}`"
            />
            <q-item-side right v-if="c.dataFim && maiorData(c.dataFim, new Date())" icon="mdi-cancel" color="fadded">
              <q-tooltip>Não presta mais serviço</q-tooltip>
            </q-item-side>
          </q-item>
        </q-list>
        <div class="row justify-center">
          <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar Colaborador" @click="prepararAdicionarColaborador()" color="secondary"/>
        </div>
      </q-expansion-item>

      <!-- Veículos -->
      <q-expansion-item class="col-12 q-my-lg">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-car-side" color="info" text-color="white" />
          </q-item-section>
          <q-item-section>
            Veículos
          </q-item-section>
          <q-item-section side v-if="possuiPerfis(['ADMIN', 'SINDICO']) && unidade.veiculos && unidade.veiculos.length>0">
            <q-checkbox v-model="exibeVeiculosInativos" label="Exibe Excluídos" />
            <q-tooltip>Exibe veículos de morades anteriores</q-tooltip>
          </q-item-section>
        </template>

        <q-list inset-separator no-border highlight v-if="unidade.veiculos && unidade.veiculos.length>0">
          <q-item v-for="v in getVeiculos" :key="v.id" @click.native="prepararAlterarVeiculo(v)">
            <q-item-side :letter="v.tipo.substring(0,1)" color="secondary">
              <q-tooltip>{{v.tipo}}</q-tooltip>
            </q-item-side>
            <q-item-main :label="`${v.marca} - ${v.modelo}`"
              :sublabel="`${v.dataCriacao ? 'Cadastro: ' + formataData(v.dataCriacao) : ''} ${v.dataExclusao ? 'Exclusao: ' + formataData(v.dataExclusao) : ''} Placa: ${v.placa} Cor: ${v.cor}`"
            />
            <q-item-side right  v-if="v.dataExclusao" icon="mdi-cancel" color="fadded">
              <q-tooltip>Veículo excluído</q-tooltip>
            </q-item-side>
          </q-item>
        </q-list>
        <div class="row justify-center">
          <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar veículo" @click="prepararAdicionarVeiculo()" color="secondary"/>
        </div>
      </q-expansion-item>
    </q-list>
    <!-- modais -->
    <!-- <adicionar-morador ref="moradorModal"/> -->
    <adicionar-colaborador ref="colaboradorModal"/>
    <!-- <adicionar-veiculo ref="veiculoModal"/> -->
    <!-- botoes -->
    <div class="barra-botoes">
      <q-btn label="Alterar Senha" color="secondary"/>
      <q-btn label="Zerar Senha" color="secondary"/>
    </div>
  </q-page>
</template>

<script>
import BotoesCrud from '../../../shared/MyBotoesCrud'
// import AdicionarMorador from './AdicionarMorador.vue'
import AdicionarColaborador from './AdicionarColaborador.vue'
// import AdicionarVeiculo from './AdicionarVeiculo.vue'

export default {
  name: 'Editar_Unidade',
  components: { BotoesCrud, AdicionarColaborador }, // , AdicionarMorador, AdicionarVeiculo
  data () {
    return {
      unidade: {},
      unidadeId: this.$route.params.unidadeId,
      exibeMoradoresInativos: false,
      exibeColaboradoresInativos: false,
      exibeVeiculosInativos: false
    }
  },
  methods: {
    carregarPagina () {
      if (this.unidadeId) {
        this.$axios.get(`/api/unidade/${this.unidadeId}`)
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
      this.$axios.put(`/api/unidade/${this.unidade.id}`, this.unidade)
        .then((res) => {
          this.unidade = res.data
          this.alertaSucesso('Unidade salva com sucesso')
        })
        .catch((err) => {
          console.error('ERRO: ', err.response.erro)
        })
    },
    cancelar () {
      this.$router.push('/condominio')
    },
    async prepararAlterarMorador (morador) {
      let index = this.unidade.moradores.indexOf(morador)
      let _morador = await this.$refs.moradorModal.prepararAlteracao(morador)
      if (_morador) {
        Object.assign(morador, _morador)
      } else this.unidade.moradores.splice(index, 1)
    },
    async prepararAdicionarMorador () {
      let _morador = await this.$refs.moradorModal.prepararInclusao()
      if (_morador) this.unidade.moradores.push(_morador)
    },
    async prepararAlterarColaborador (colaborador) {
      let index = this.unidade.colaboradores.indexOf(colaborador)
      let _colaborador = await this.$refs.colaboradorModal.prepararAlteracao(colaborador)
      if (_colaborador) {
        Object.assign(colaborador, _colaborador)
      } else this.unidade.colaboradores.splice(index, 1)
    },
    async prepararAdicionarColaborador () {
      let _colaborador = await this.$refs.colaboradorModal.prepararInclusao()
      if (_colaborador) this.unidade.colaboradores.push(_colaborador)
    },
    async prepararAlterarVeiculo (veiculo) {
      let index = this.unidade.veiculos.indexOf(veiculo)
      let _veiculo = await this.$refs.veiculoModal.prepararAlteracao(veiculo)
      if (_veiculo) {
        Object.assign(veiculo, _veiculo)
      } else this.unidade.veiculos.splice(index, 1)
    },
    async prepararAdicionarVeiculo () {
      let _veiculo = await this.$refs.veiculoModal.prepararInclusao()
      if (_veiculo) this.unidade.veiculos.push(_veiculo)
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
    },
    getMoradores: function () {
      if (this.unidade.moradores && this.unidade.moradores.length > 0) {
        return this.exibeMoradoresInativos ? this.unidade.moradores : this.unidade.moradores.filter(i => !i.dataExclusao)
      } else return null
    },
    getVeiculos: function () {
      if (this.unidade.veiculos && this.unidade.veiculos.length > 0) {
        return this.exibeVeiculosInativos ? this.unidade.veiculos : this.unidade.veiculos.filter(i => !i.dataExclusao)
      } else return null
    },
    getColaboradores: function () {
      if (this.unidade.colaboradores && this.unidade.colaboradores.length > 0) {
        console.log('entrouaaa', this.exibeColaboradoresInativos)
        return this.exibeColaboradoresInativos ? this.unidade.colaboradores : this.unidade.colaboradores.filter(i => !i.dataFim || !this.maiorQueDataAtual(i.dataFim))
      } else return null
    }
  }
}
</script>
