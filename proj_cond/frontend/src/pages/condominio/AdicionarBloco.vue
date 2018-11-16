<template>
  <q-modal v-model="exibeModal" no-backdrop-dismiss no-esc-dismiss
    :content-css="{minWidth: '50vw', maxWidth: '80vw'}" @show="prepararModal">
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
        <div class="row col-12 justify-center">
          <div>
            <div class="row col-10" v-for="(andar, i) in bloco.andar" :key="i">
              <div class="divAndar">
                <q-input :value="andar.andar" align="center"
                  @input="val => {bloco.andar[i].andar = val}"/>
              </div>
              <div class="col-2 divUnidade" v-for="(unidade, y) in andar.unidades" :key="y">
                <q-input :value="unidade"
                  @input="val => {bloco.andar[i].unidades[y] = val}"/>
                <q-btn flat dense round class="botaoExcluirUnidade material-icons primary"
                  @click="deletarUnidade(i, y)" title="Deletar unidade" icon="delete"/>
              </div>
            </div>
          </div>
        </div>
        <div class="row justify-center gutter-sm">
          <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" color="faded" @click="fecharModal" label="Cancelar" /></div>
          <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" color="primary" @click="addAltBloco()" label="Confirmar" /></div>
        </div>
    </div>
  </q-modal>
</template>

<script>
import { QBtn, QField, QInput, QModal } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import Vue from 'vue'
import { Bloco, Andar } from './mixin.js'

export default {
  components: {
    QBtn, QField, QInput, QModal
  },
  props: {
    exibeModal: {required: true, type: Boolean, default: false},
    modo: {required: true, type: String},
    value: {required: true, type: Object, default: () => new Bloco()}
  },
  data () {
    return {
      bloco: new Bloco()
    }
  },
  validations: {
    bloco: {
      nome: { required },
      andares: { required },
      unidadesPorAndar: { required }
    }
  },
  monted () {
  },
  methods: {
    gerarBloco () {
      this.$v.bloco.andares.$touch()
      this.$v.bloco.unidadesPorAndar.$touch()
      if (this.$v.bloco.andares.$error || this.$v.bloco.unidadesPorAndar.$error) {
        this.$q.notify('Informe a Qtd. andares e Unidades por andar.')
      } else {
        const primeira = this.bloco.numeroPrimeiraUnidade ? this.bloco.numeroPrimeiraUnidade : 101
        this.bloco.andar = new Array(this.bloco.andares)
        for (let i = 0; i < this.bloco.andar.length; i++) {
          // defino o numero do andar
          this.bloco.andar[i] = new Andar(i + Math.floor(primeira / 100),
            new Array(this.bloco.unidadesPorAndar))
          for (let y = 0; y < this.bloco.andar[i].unidades.length; y++) {
            this.bloco.andar[i].unidades[y] = i * 100 + primeira + y
          }
        }
      }
    },
    deletarUnidade (andar, unidade) {
      this.bloco.andar[andar].unidades.splice(unidade, 1)
      // verifica se existem elementos no array
      if (this.bloco.andar[andar].unidades.length > 0) Vue.set(this.bloco.andar, andar, this.bloco.andar[andar])
      else this.bloco.andar.splice(andar, 1)
      console.log(this.bloco.andar)
    },
    addAltBloco () {
      this.$v.bloco.$touch()
      if (this.$v.bloco.$error || !this.bloco.andar || this.bloco.andar.length === 0) {
        this.$q.notify('Preencha as informações do bloco e clique em Gerar Bloco.')
      } else {
        this.fecharModal()
        if (this.modo === 'ALTERACAO') {
          this.$emit('change', this.bloco)
        } else if (this.modo === 'INCLUSAO') {
          this.$emit('acaoAdicionarBloco', this.bloco)
        }
      }
    },
    prepararModal () {
      this.$v.bloco.$reset()
      this.bloco = JSON.parse(JSON.stringify(this.value))
    },
    fecharModal () {
      this.$emit('fechar')
    }
  }
}
</script>
<style scoped>
</style>
