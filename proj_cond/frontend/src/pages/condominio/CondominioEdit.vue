<template>
  <q-page class="justify-center pagina">
    <botoes-crud @excluir="excluir()" @cancelar="cancelar()"
      :exibeExcluir="alteravel"
      :exibeConfirmar="alteravel" @confirmar="salvar()"
      labelConfirmar="Salvar"
      :titulo="!alteravel ? condominio.nome : null" />
    <div class="row" v-bind:class="[$q.screen.lt.sm ? '' : 'gutter-sm']" v-if="alteravel">
      <q-field :count="50" v-bind:class="[!alteravel ? 'col-xs-12' : 'col-md-10 col-xs-12']">
        <q-input v-model="condominio.nome" float-label="Nome do Condomínio"
          @blur="$v.condominio.nome.$touch" :error="$v.condominio.nome.$error"/>
      </q-field>
      <q-field class="col-md-2 col-xs-12" label="Situação" orientation="vertical">
        <div v-bind:class="'text-'+classSituacao[1]">
          {{condominio.situacao}}
        </div>
      </q-field>
    </div>

    <q-list v-if="condominioId && condominio.blocos && condominio.blocos.length>0" highlight class="col-12 q-my-lg">
      <q-collapsible
        v-for="(bl, i) in condominio.blocos" :key="i">
        <template slot="header">
          <q-item-side>
            <q-item-tile icon="business" color="primary" />
          </q-item-side>
          <q-item-main :label="bl.nome" />
        </template>
        <div class="absolute" v-if="alteravel" style="right: 0px; bottom: 0px" >
          <q-btn round flat fab-mini icon="edit" color="faded" title="Alterar Bloco" @click.native="prepararAlterarBloco(bl)"/>
          <q-btn round flat fab-mini icon="delete" color="faded" title="Excluir Bloco"/>
        </div>
        <div class="row col-12 justify-center">
          <div style="display: table;">
            <div class="divUnidade"
              v-bind:class="[unidade.andar !== bl.unidades[Math.max(y - 1,0)].andar ? 'clear' : '']"
              v-for="(unidade, y) in bl.unidades" :key="y" >
              <a v-on:click="detalharUnidade(bl.id,unidade.id)">{{unidade.nome}}</a>
            </div>
          </div>
        </div>
      </q-collapsible>
    </q-list>
    <div v-if="condominioId && alteravel" class="row justify-center">
      <q-btn class="col-xs-12 col-md-auto q-ma-sm" icon="business" label="Adicionar bloco" @click="prepararAdicionarBloco()" color="secondary"/>
      <q-btn v-if="condominioPronto && condominio.situacao==='RASCUNHO'" class="col-xs-12 col-md-auto q-ma-sm"
        icon="done_all" color="negative"
        label="Finalizar condominio"
        title="Gera o(s) Bloco(s), as unidades e as respectivas contas de usuários"
        @click="gerarUsuarios()"/>
    </div>
    <adicionar-bloco ref="blocoModal"/>
  </q-page>
</template>

<script>
import { QBtn, QField, QInput, QCollapsible, QTooltip } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import { getBlocoNew, getCondominioNew } from './mixin.js'
import axios from 'axios'
import AdicionarBloco from './AdicionarBloco.vue'
import BotoesCrud from '../shared/BotoesCrud'

export default {
  name: 'CadastroCondominio',
  components: { QBtn, QField, QInput, QCollapsible, QTooltip, 'adicionar-bloco': AdicionarBloco, 'botoes-crud': BotoesCrud },
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
        this.alertaErro('Informe o nome do Condomínio')
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
            this.alertaSucesso('Condomínio salvo com sucesso')
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
      this.modalConfirmaAcao().then(() => {
        axios.delete(`/api/condominio/${this.condominio.id}`)
          .then((res) => {
            this.alertaSucesso('Condomínio excluído com sucesso!')
            this.cancelar()
          })
          .catch((err) => {
            throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
          })
      }).catch(() => {})
    },
    async prepararAlterarBloco (bloco) {
      // this.bloco = bloco
      let _bloco = await this.$refs.blocoModal.prepararAlteracao(bloco)
      Object.assign(bloco, _bloco)
    },
    async prepararAdicionarBloco () {
      let _bloco = await this.$refs.blocoModal.prepararInclusao()
      this.condominio.blocos.push(_bloco)
    },
    gerarUsuarios () {
      this.modalConfirmaAcao('Atenção', 'Verique se todos os blocos e unidades estão corretos. Não será possível realizar alterações futuramente! ')
        .then(() => {
          axios.put(`/api/condominio/${this.condominio.id}/gerar_contas_usuario`, this.condominio)
            .then((res) => {
              this.condominio = res.data
              this.alertaSucesso('Unidades e contas de usuarios geradas com sucesso')
            })
            .catch((err) => {
              throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
            })
        })
        .catch(() => {})
    },
    detalharUnidade (blocoId, unidadeId) {
      this.$router.push(`/condominio/${this.condominio.id}/${blocoId}/${unidadeId}`)
    }
  },
  mounted () {
    this.carregarPagina()
  },
  computed: {
    classSituacao: function () {
      let classe = [null, '']
      switch (this.condominio.situacao) {
        case 'NÃO SALVO':
          classe = ['Informe um nome para o condomínio e clique em "Confirmar"', 'negative']
          break
        case 'RASCUNHO':
          classe = ['Adicione blocos e unidades e depois clique em "Finalizar condominio"', 'warning']
          break
        case 'INATIVO':
          classe = ['Condominio desativado no sistema', 'dark']
          break
      }
      return classe
    },
    alteravel: function () {
      return this.condominio.situacao !== 'ATIVO'
    },
    condominioPronto: function () {
      return this.condominio.blocos.some(bloco => !!bloco.id && bloco.unidades.some(unidade => !!unidade.id))
    }
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
    float: left;
  }
  .clear {
    clear: left;
  }
  @media (max-width: 575px) {
    .divUnidade {
      margin-bottom: 2px;
      margin-right: 2px;
      min-width: 60px!important;;
      max-width: 70px!important;;
      float: left;
    }
  }
</style>
