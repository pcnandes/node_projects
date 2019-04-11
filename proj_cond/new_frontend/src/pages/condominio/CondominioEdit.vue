<template>
  <q-page class="justify-center pagina">
    <my-botoes-crud @excluir="excluir()" @cancelar="cancelar()"
      :exibeExcluir="alteravel && !!condominio.id"
      :exibeConfirmar="alteravel" @confirmar="salvar()"
      labelConfirmar="Salvar"
      :titulo="!alteravel ? condominio.nome : null" />
    <div class="row" v-bind:class="[$q.screen.lt.sm ? '' : 'gutter-sm']" v-if="alteravel">
      <my-input-text ref="nome" icon="mdi-account" v-model.trim="condominio.nome"
        label="Nome do Condomínio" autofocus required v-bind:class="[!alteravel ? 'col-xs-12' : 'col-md-10 col-xs-12']"
        max-length="50" counter/>
      <my-input-text v-model.trim="condominio.situacao"
        label="Situação" class="col-md-2 col-xs-12 q-pl-sm q-mb-lg" :bg-color="classSituacao[1]" readonly/>
    </div>

    <q-list v-if="condominioId && condominio.blocos && condominio.blocos.length>0"
        class="col-12 q-my-lg" bordered separator>
      <q-expansion-item
        v-for="(bl, i) in condominio.blocos" :key="i" header-class="bg-grey-5 text-black"
        expand-icon-class="text-black">
        <template v-slot:header>
          <q-item-section avatar>
            <q-avatar icon="mdi-office-building" />
          </q-item-section>
          <q-item-section>
            {{bl.nome}}
          </q-item-section>
        </template>
        <q-card class="bg-grey-3">
          <div class="absolute" v-if="alteravel" style="right: 0px; bottom: 0px" >
            <q-btn round flat fab-mini icon="mdi-pencil" color="faded" title="Alterar Bloco" @click.native="prepararAlterarBloco(bl)"/>
            <q-btn round flat fab-mini icon="mdi-delete" color="faded" title="Excluir Bloco"/>
          </div>
          <div class="row col-12 justify-center q-pa-sm">
            <div style="display: table;">
              <div class="divUnidade"
                v-bind:class="[unidade.andar !== bl.unidades[Math.max(y - 1,0)].andar ? 'clear' : '']"
                v-for="(unidade, y) in bl.unidades" :key="y" >
                <a v-if="condominio.situacao!=='RASCUNHO'" v-on:click="detalharUnidade(bl.id,unidade.id)">{{unidade.nome}}</a>
                <span v-if="condominio.situacao==='RASCUNHO'">{{unidade.nome}}</span>
              </div>
            </div>
          </div>
        </q-card>
      </q-expansion-item>
    </q-list>
    <div v-if="condominioId && alteravel" class="barra-botoes">
      <q-btn icon="mdi-plus" label="Adicionar bloco" @click="prepararAdicionarBloco()"
        color="secondary" size="17px"/>
      <q-btn v-if="condominioPronto && condominio.situacao==='RASCUNHO'" size="17px"
        icon="mdi-check-all" color="negative"
        label="Finalizar condominio"
        title="Gera o(s) Bloco(s), as unidades e as respectivas contas de usuários"
        @click="confirmaFinalizacao()"/>
    </div>
    <adicionar-bloco ref="blocoModal"/>
    <my-confirmacao ref="confirmaFinalizarCondominio" @confirmar="finalizarCondominioGerarUsuarios()"
      texto="Verique se todos os blocos e unidades estão corretos. Não será possível realizar alterações futuramente!"/>
  </q-page>
</template>

<script>
import { getBlocoNew, getCondominioNew } from './mixin.js'
import AdicionarBloco from './AdicionarBloco.vue'
import MyBotoesCrud from '../../shared/MyBotoesCrud.vue'
import MyInputText from '../../shared/MyInputText'
import MyConfirmacao from '../../shared/MyConfirmacao'

export default {
  name: 'CadastroCondominio',
  components: { MyInputText, AdicionarBloco, MyBotoesCrud, MyConfirmacao },
  data () {
    return {
      condominioId: this.$route.params.id,
      bloco: getBlocoNew(),
      condominio: getCondominioNew()
    }
  },
  methods: {
    carregarPagina () {
      if (this.condominioId) {
        this.$axios.get(`/api/condominio/${this.condominioId}`)
          .then((res) => {
            this.condominio = res.data
          })
          .catch((err) => {
            console.error('ERRO: ', err.response.erro, err.erro)
            this.alertaErro('Erro ao carregar o condomínio')
            this.$router.go(-1)
          })
      }
    },
    salvar () {
      if (this.$refs.nome.hasError()) {
        this.alertaErro('Informe o nome do Condomínio')
        return
      }
      if (!this.condominio.id) {
        this.$axios.post('/api/condominio', this.condominio)
          .then((res) => {
            this.condominio = res.data
            this.condominioId = res.data.id
            this.$router.push({ path: `/condominio/${this.condominioId}` })
            this.carregarPagina()
          })
          .catch((err) => {
            console.error('ERRO: ', err.response.erro)
          })
      } else {
        this.$axios.put(`/api/condominio/${this.condominio.id}`, this.condominio)
          .then((res) => {
            this.condominio = res.data
            this.alertaSucesso('Condomínio salvo com sucesso')
          })
          .catch((err) => {
            console.error('ERRO: ', err.response.erro)
          })
      }
    },
    cancelar () {
      this.$router.push('/condominio')
    },
    excluir () {
      this.$axios.delete(`/api/condominio/${this.condominio.id}`)
        .then((res) => {
          this.alertaSucesso('Condomínio excluído com sucesso!')
          this.cancelar()
        })
        .catch((err) => {
          throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
        })
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
    confirmaFinalizacao () {
      this.$refs.confirmaFinalizarCondominio.show()
    },
    finalizarCondominioGerarUsuarios () {
      this.$axios.put(`/api/condominio/${this.condominio.id}/gerar_contas_usuario`, this.condominio)
        .then((res) => {
          this.condominio = res.data
          this.alertaSucesso('Unidades e contas de usuarios geradas com sucesso')
        })
        .catch((err) => {
          throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
        })
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
    min-width: 50px!important;
    max-width: 88px!important;
    margin-bottom: 5px;
    margin-right: 5px;
    text-align: center;
    float: left;
  }
  .clear {
    clear: left;
  }
  .divUnidade > a {
    color: #1565c0;
    text-decoration: underline;
    cursor: pointer;
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
