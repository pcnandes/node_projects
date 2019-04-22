<template>
  <q-page class="justify-center pagina">
    <botoes-crud @cancelar="cancelar()" :exibeExcluir="false" labelConfirmar="Salvar" @confirmar="salvar()"
      :titulo="getTitulo" />
    <!-- moradores -->
    <q-list inset-separator no-border highlight>
      <q-expansion-item class="col-12 q-mb-xs" header-class="bg-grey-5 text-black">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-human-male-boy" color="positive" text-color="white" />
          </q-item-section>
          <q-item-section>
            Moradores
          </q-item-section>
          <!-- <q-item-section side v-if="possuiPerfis(['ADMIN', 'SINDICO']) && unidade.moradores && unidade.moradores.length>0">
            <q-checkbox v-model="exibeMoradoresInativos" label="Exibe excluídos" />
            <q-tooltip>Exibe moradores anteriores da unidade</q-tooltip>
          </q-item-section> -->
        </template>
        <q-card class="bg-grey-3 q-pa-sm">
          <q-list separator highlight v-if="unidade.moradores && unidade.moradores.length>0">
            <q-item clickable v-ripple v-for="m in unidade.moradores" :key="m.id"
              @click="prepararAlterarMorador(m)" class="bg-grey-4">
              <q-item-section avatar color="secondary">
                <q-avatar :color="getCorMorador(m)"
                  text-color="white">
                  {{m.tipo.substring(0,1)}}
                  <q-tooltip>{{m.tipo}}</q-tooltip>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{m.nome}}</q-item-label>
                <q-item-label caption lines="2">
                  {{`${m.dataCriacao ? 'Cadastro: ' + formataData(m.dataCriacao) : ''} ${m.dataExclusao ? 'Exclusao: ' + formataData(m.dataExclusao) : ''} ${m.email ? 'email: ' + m.email : ''}` + `${m.telefone ? ' Telefone: ' + m.telefone : ''}` + `${m.celular1 ? ' Celular1: ' + m.celular1 : ''}` + `${m.celular2 ? ' Celular2: ' + m.celular2 : ''}`}}
                </q-item-label>
              </q-item-section>
              <q-item-section side top>
                <q-icon name="mdi-human-greeting" color="primary" v-if="!m.dataExclusao && m.responsavel">
                  <q-tooltip>Responsável pela unidade</q-tooltip>
                </q-icon>
                <q-icon name="mdi-contact-mail" color="secondary" v-if="!m.dataExclusao && m.enviarNotificacaoEmail">
                  <q-tooltip>Recebe notificações por email</q-tooltip>
                </q-icon>
                <q-icon name="mdi-cancel" color="grey-14" v-if="m.dataExclusao">
                  <q-tooltip>Morador excluído</q-tooltip>
                </q-icon>
              </q-item-section>
            </q-item>
          </q-list>
          <div class="row justify-center q-mt-sm">
            <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar Morador"
              @click="prepararAdicionarMorador()" color="secondary" size="17px"/>
          </div>
        </q-card>
      </q-expansion-item>

      <!-- Colaboradores -->
      <q-expansion-item class="col-12 q-mb-xs" header-class="bg-grey-5 text-black">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-worker" color="warning" text-color="white" />
          </q-item-section>
          <q-item-section>
            Colaboradores
          </q-item-section>
          <!--
            <q-item-section side v-if="unidade.colaboradores && unidade.colaboradores.length>0">
            <q-checkbox v-model="exibeColaboradoresInativos" label="Exibe Inativos" />
            <q-tooltip>Exibe colaboradores inativos</q-tooltip>
          </q-item-section>
          -->
        </template>
        <q-card class="bg-grey-3 q-pa-sm">
          <q-list class="col-12 q-px-lg" separator v-if="unidade.colaboradores && unidade.colaboradores.length>0">
            <q-item clickable v-ripple v-for="c in unidade.colaboradores" :key="c.id"
              @click="prepararAlterarColaborador(c)" class="bg-grey-4">
              <q-item-section avatar color="secondary">
                <q-avatar :color="colaboradorAtivo(c) ? 'positive' : 'grey-6'" text-color="white">
                  {{colaboradorAtivo(c) ? 'A' : 'I'}}
                  <q-tooltip>{{colaboradorAtivo(c) ? 'Colaborador Ativo' : 'Colaborador Inativo'}}</q-tooltip>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{c.nome}}</q-item-label>
                <q-item-label caption lines="2">
                  {{`Início Atividade: ${formataData(c.dataInicio)} ${c.dataFim ? 'Fim Atividade: ' + formataData(c.dataFim) : ''} ${c.tipoDoc}: ${c.numeroDoc}`}}
                </q-item-label>
              </q-item-section>
              <q-item-section side v-if="!colaboradorAtivo(c)">
                <q-icon name="mdi-cancel" color="grey-7">
                  <q-tooltip>Não presta mais serviço</q-tooltip>
                </q-icon>
              </q-item-section>
            </q-item>
          </q-list>
          <div class="row justify-center q-mt-sm">
            <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar Colaborador"
              @click="prepararAdicionarColaborador()" color="secondary" size="17px"/>
          </div>
        </q-card>
      </q-expansion-item>

      <!-- Veículos -->
      <q-expansion-item class="col-12 q-mb-xs" header-class="bg-grey-5 text-black">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-car-side" color="info" text-color="white" />
          </q-item-section>
          <q-item-section>
            Veículos
          </q-item-section>
          <!-- <q-item-section side v-if="possuiPerfis(['ADMIN', 'SINDICO']) && unidade.veiculos && unidade.veiculos.length>0">
            <q-checkbox v-model="exibeVeiculosInativos" label="Exibe Excluídos" />
            <q-tooltip>Exibe veículos de morades anteriores</q-tooltip>
          </q-item-section> -->
        </template>
        <q-card class="bg-grey-3 q-pa-sm">
          <q-list inset-separator no-border highlight v-if="unidade.veiculos && unidade.veiculos.length>0">
            <q-item clickable v-ripple v-for="v in unidade.veiculos" :key="v.id"
              @click="prepararAlterarVeiculo(v)" class="bg-grey-4">
              <q-item-section avatar v-if="v.dataExclusao">
                <q-avatar color="grey-6" text-color="white">
                  E<q-tooltip>Veículo Excluído</q-tooltip>
                </q-avatar>
              </q-item-section>
              <q-item-section avatar v-else>
                <q-avatar color="secondary" text-color="white">
                  {{v.tipo.substring(0,1)}}
                  <q-tooltip>{{v.tipo}}</q-tooltip>
                </q-avatar>
              </q-item-section>
              <q-item-section>
                <q-item-label>{{`${v.marca} - ${v.modelo}`}}</q-item-label>
                <q-item-label caption lines="2">
                  {{`${v.dataCriacao ? 'Cadastro: ' + formataData(v.dataCriacao) : ''} ${v.dataExclusao ? 'Exclusao: ' + formataData(v.dataExclusao) : ''} Placa: ${v.placa} Cor: ${v.cor}`}}
                </q-item-label>
              </q-item-section>
              <q-item-section side v-if="v.dataExclusao">
                <q-icon name="mdi-cancel" color="grey-7">
                  <q-tooltip>Veículo excluído</q-tooltip>
                </q-icon>
              </q-item-section>
            </q-item>

            <!-- <q-item v-for="v in unidade.veiculos" :key="v.id"
              @click.native="prepararAlterarVeiculo(v)" class="bg-grey-4">
              <q-item-side :letter="v.tipo.substring(0,1)" color="secondary">
                <q-tooltip>{{v.tipo}}</q-tooltip>
              </q-item-side>
              <q-item-main :label="`${v.marca} - ${v.modelo}`"
                :sublabel="`${v.dataCriacao ? 'Cadastro: ' + formataData(v.dataCriacao) : ''} ${v.dataExclusao ? 'Exclusao: ' + formataData(v.dataExclusao) : ''} Placa: ${v.placa} Cor: ${v.cor}`"
              />
              <q-item-side right  v-if="v.dataExclusao" icon="mdi-cancel" color="fadded">
                <q-tooltip>Veículo excluído</q-tooltip>
              </q-item-side>
            </q-item> -->
          </q-list>
          <div class="row justify-center q-mt-sm">
            <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="mdi-plus" label="Adicionar veículo"
              @click="prepararAdicionarVeiculo()" color="secondary" size="17px"/>
          </div>
        </q-card>
      </q-expansion-item>
    </q-list>
    <!-- modais -->
    <adicionar-morador ref="moradorModal"/>
    <adicionar-colaborador ref="colaboradorModal"/>
    <adicionar-veiculo ref="veiculoModal"/>
    <!-- botoes -->
    <div class="barra-botoes">
      <q-btn label="Alterar Senha" color="secondary" size="17px"/>
      <q-btn label="Zerar Senha" color="secondary" size="17px"/>
    </div>
  </q-page>
</template>

<script>
import BotoesCrud from '../../../shared/MyBotoesCrud'
import AdicionarMorador from './AdicionarMorador.vue'
import AdicionarColaborador from './AdicionarColaborador.vue'
import AdicionarVeiculo from './AdicionarVeiculo.vue'

export default {
  name: 'Editar_Unidade',
  components: { BotoesCrud, AdicionarColaborador, AdicionarMorador, AdicionarVeiculo },
  data () {
    return {
      unidade: {},
      unidadeId: this.$route.params.unidadeId
      /* exibeMoradoresInativos: false,
      exibeColaboradoresInativos: false,
      exibeVeiculosInativos: false */
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
    },
    colaboradorAtivo (colaborador) {
      if (!colaborador.dataInicio || this.maiorData(colaborador.dataInicio, new Date())) {
        return false
      } else if (!!colaborador.dataFim && this.maiorData(new Date(), colaborador.dataFim)) return false
      else return true
    },
    getCorMorador (morador) {
      let cor = ''
      switch (morador.tipo) {
        case 'MORADOR': cor = 'blue'; break
        case 'LOCADOR': cor = 'blue-10'; break
        case 'LOCATARIO': cor = 'green'; break
        default: cor = 'blue'; break
      }
      return cor
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
    /* getMoradores: function () {
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
    } */
  }
}
</script>
