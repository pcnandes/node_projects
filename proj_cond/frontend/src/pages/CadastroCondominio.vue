<template>
   <q-page padding class="docs-input row justify-center">
    <div style="width: 800px; max-width: 90vw;" >
      <q-field :count="50" helper="Nome do condomínio" >
        <q-input v-model="condominio.nome" float-label="Nome do Condomínio"/>
      </q-field>
      <br/>
      <div class="row justify-center">
        <q-btn label="Adicionar bloco" @click="prepararAdicionarBloco()" color="primary"/>
      </div>
      <div class="row justify-center" v-if="condominio.blocos && condominio.blocos.length>0">
        <q-list class="col-12">
          <q-collapsible icon="explore" :label="bloco.nome"
            v-for="(bloco, i) in condominio.blocos" :key="i">
            <div>
              {{bloco.unidades}}
            </div>
          </q-collapsible>
        </q-list>
      </div>
      <q-modal v-model="exibeModalBloco" no-backdrop-dismiss no-esc-dismiss :content-css="{minWidth: '50vw'}">
        <i class="material-icons light_gray absolute-top-right"
          title="Essa tela facilitará a criação de um bloco. Informe o 'Quantidade de andares' e 'Unidades por andar' para 'Gerar Bloco'. Caso a 'Primeira unidade' nao seja a 101, informe.">
          help
        </i>
        <div class="doc-container justify-center gutter-y-sm" style="padding: 20px;">
            <div class="row justify-center q-display-1">
              Cadastro Bloco
            </div>
            <div class="row gutter-sm" >
              <q-field :count="10" class="col-md-6 col-xs-12">
                <q-input v-model="bloco.nome" type="text" float-label="Nome do bloco"
                  @blur="$v.bloco.nome.$touch" :error="$v.bloco.nome.$error"/>
              </q-field>
              <q-field :count="10" class="col-md-6 col-xs-12">
                <q-input v-model="bloco.numeroPrimeiraUnidade" type="number" float-label="Primeira Unidade"/>
              </q-field>
              <q-field :count="10" class="col-md-6 col-xs-12">
                <q-input v-model="bloco.andares" type="number" float-label="Qtd. andares"
                  @blur="$v.bloco.andares.$touch" :error="$v.bloco.andares.$error"/>
              </q-field>
              <q-field :count="10" class="col-md-6 col-xs-12">
                <q-input v-model="bloco.unidadesPorAndar" type="number" float-label="Unidades por andar"
                  @blur="$v.bloco.unidadesPorAndar.$touch" :error="$v.bloco.unidadesPorAndar.$error"/>
              </q-field>
              <div class="col-12 row justify-end">
                <q-btn class="col-xs-12 col-md-auto" color="secondary" @click="gerarBloco()" label="Gerar bloco" />
              </div>
            </div>
            <div>
              <div class="row col-10 justify-center" v-for="(andar, i) in bloco.unidades" :key="i">
                <div class="col-auto divUnidade" v-for="(unidade, y) in andar" :key="y">
                  <q-input :value="unidade"
                    @input="val => {bloco.unidades[i][y] = val}"/>
                  <q-btn flat dense round class="botaoExcluirUnidade material-icons primary"
                    @click="deletarUnidade(i, y)" title="Deletar unidade" icon="delete"/>
                </div>
              </div>
            </div>

            <div class="row justify-center gutter-sm">
              <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" color="faded" @click="exibeModalBloco = false" label="Cancelar" /></div>
              <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" color="primary" @click="adicionarBloco()" label="Adicionar" /></div>
            </div>
        </div>
      </q-modal>
    </div>
   </q-page>
</template>

<script>
import { QBtn, QField, QInput, QModal, QCollapsible } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import Vue from 'vue'

class Bloco {
  constructor () {
    this.nome = ''
    this.numeroPrimeiraUnidade = ''
    this.andares = ''
    this.unidadesPorAndar = ''
    this.unidades = [] // esse cara é uma matriz [andar][unidade]
  }
}
class AreaComum {
  constructor () {
    this.titulo = ''
    this.descricao = ''
    this.agenda = '' /* ver melhor forma de implementar..
    ex. periodicidade[semanal, mensal, anual]
      semanal -> exibir agenda de uma semana onde para cada dia é dada a opção de horario inicio e fim
      mensal -> dentro de um mes, para cada dia é possivel definir horario de inicio e fim
      anual -> exibe ano inteiro e para cada dia é possivel definir horario de inicio e fim
      ** permitir criar um horario de inicio e fim padrao
      */
  }
}
class Garagem {
  constructor () {
    this.identificacao = ''
    this.usuario = '' // opcional que vai guardar a unidade responsável
  }
}
class Condominio {
  constructor () {
    this.nome = ''
    this.blocos = [] // new Blocos
  }
}

export default {
  name: 'CadastroCondominio',
  components: { QBtn, QField, QInput, QModal, QCollapsible },
  data () {
    return {
      exibeModalBloco: false,
      bloco: new Bloco(),
      areaComum: new AreaComum(),
      garagem: new Garagem(),
      condominio: new Condominio()
    }
  },
  validations: {
    form: {
      condominio: { required },
      usuario: { required },
      senha: { required }
    },
    bloco: {
      nome: { required },
      andares: { required },
      unidadesPorAndar: { required }
    }
  },
  computed: {

  },
  mounted () {

  },
  created () { },
  methods: {
    prepararAdicionarBloco () {
      this.exibeModalBloco = true
      this.bloco = new Bloco()
    },
    adicionarBloco () {
      this.$v.bloco.$touch()
      if (this.$v.bloco.$error || !this.bloco.unidades || this.bloco.unidades.length === 0) {
        this.$q.notify('Preencha as informações do bloco e clique em Gerar Bloco.')
      } else {
        this.condominio.blocos.push(this.bloco)
        this.exibeModalBloco = false
      }
    },
    gerarBloco () {
      this.$v.bloco.andares.$touch()
      this.$v.bloco.unidadesPorAndar.$touch()
      if (this.$v.bloco.andares.$error || this.$v.bloco.unidadesPorAndar.$error) {
        this.$q.notify('Informe a Qtd. andares e Unidades por andar.')
      } else {
        console.log('gerandoPredio')
        const primeira = this.bloco.numeroPrimeiraUnidade ? this.bloco.numeroPrimeiraUnidade : 101
        this.bloco.unidades = new Array(this.bloco.andares)
        for (let i = 0; i < this.bloco.unidades.length; i++) {
          this.bloco.unidades[i] = new Array(this.bloco.unidadesPorAndar)
          for (let y = 0; y < this.bloco.unidades[i].length; y++) {
            this.bloco.unidades[i][y] = i * 100 + primeira + y
          }
        }
      }
    },
    deletarUnidade (andar, unidade) {
      this.bloco.unidades[andar].splice(unidade, 1)
      // verifica se existem elementos no array
      if (this.bloco.unidades[andar].length > 0) Vue.set(this.bloco.unidades, andar, this.bloco.unidades[andar])
      else this.bloco.unidades.splice(andar, 1)
      console.log(this.bloco.unidades)
    }
  }
}
</script>

<style>
  .divUnidade {
    position:relative;
    border: 1px solid #5a5a5a;
    min-width: 60px!important;
    max-width: 88px!important;
    margin-bottom: 8px;
    margin-right: 8px;
  }
  .botaoExcluirUnidade {
    position:absolute; top:0; right:0;
    margin:0;
  }
  .material-icons.primary { color: #5a5a5a; }
  .material-icons.light_gray { color: #9c9b9b; }

  @media (max-width: 575px) {
    .divUnidade {
      margin-bottom: 5px;
      margin-right: 5px;
      min-width: 60px!important;;
      max-width: 70px!important;;
    }
  }
</style>
