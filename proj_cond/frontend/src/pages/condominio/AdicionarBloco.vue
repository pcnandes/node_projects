<template>
  <q-modal no-backdrop-dismiss no-esc-dismiss ref="modalRef"
    :content-css="{minWidth: '50vw', maxWidth: '80vw'}">
    <i class="material-icons light_gray absolute-top-right"
      title="Essa tela facilitará a criação de um bloco. Informe o 'Quantidade de andares' e 'Unidades por andar' para 'Gerar Bloco'. Caso a 'Primeira unidade' nao seja a 101, informe.">
      help
    </i>
    <div class="doc-container justify-center gutter-y-sm" style="padding: 20px;">
        <div class="row justify-center q-display-1">
          Cadastro Bloco
        </div>
        <div class="row gutter-sm" >
          <q-field :count="10" class="col-md-6 col-xs-12" v-bind:class="modo==='ALTERACAO'?'col-md-12':''">
            <q-input v-model="bloco.nome" type="text" float-label="Nome do bloco"
              @blur="$v.bloco.nome.$touch" :error="$v.bloco.nome.$error"/>
          </q-field>
          <q-field :count="10" class="col-md-6 col-xs-12" v-if="modo==='INCLUSAO'">
            <q-input v-model="numeroPrimeiraUnidade" type="number" float-label="Primeira Unidade"/>
          </q-field>
          <q-field :count="10" class="col-md-6 col-xs-12" v-if="modo==='INCLUSAO'">
            <q-input v-model="andares" type="number" float-label="Qtd. andares"
              @blur="$v.andares.$touch" :error="$v.andares.$error"/>
          </q-field>
          <q-field :count="10" class="col-md-6 col-xs-12" v-if="modo==='INCLUSAO'">
            <q-input v-model="unidadesPorAndar" type="number" float-label="Unidades por andar"
              @blur="$v.unidadesPorAndar.$touch" :error="$v.unidadesPorAndar.$error"/>
          </q-field>
          <div class="col-12 row justify-end" v-if="modo==='INCLUSAO'">
            <q-btn class="col-xs-12 col-md-auto" color="secondary" @click="gerarBloco()" label="Gerar bloco" />
          </div>
        </div>
        <div class="row col-12 justify-center">
          <div style="display: table;">
            <div class="divUnidade"
              v-bind:class="[unidade.andar !== bloco.unidades[Math.max(i - 1,0)].andar ? 'clear' : '']"
              v-for="(unidade, i) in bloco.unidades" :key="i">
              <q-input :value="unidade.nome"
                @input="val => {bloco.unidades[i].nome = val}"/>
              <q-btn flat dense round class="botaoExcluirUnidade material-icons primary"
                @click="deletarUnidade(i)" title="Deletar unidade" icon="delete"/>
            </div>
          </div>
        </div>
        <div class="row justify-center gutter-sm">
          <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" color="faded" @click="cancelar()" label="Cancelar" /></div>
          <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" color="primary" @click="confirmar()" label="Confirmar" /></div>
        </div>
    </div>
  </q-modal>
</template>

<script>
import { QBtn, QField, QInput, QModal } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import { getBlocoNew } from './mixin.js'

export default {
  components: {
    QBtn, QField, QInput, QModal
  },
  data () {
    return {
      bloco: getBlocoNew(),
      andares: null,
      unidadesPorAndar: null,
      numeroPrimeiraUnidade: null,
      romiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  validations: {
    bloco: {
      nome: { required },
      unidades: []
    },
    andares: { required },
    unidadesPorAndar: { required }
  },
  methods: {
    async prepararInclusao () {
      this.$v.bloco.$reset()
      this.modo = 'INCLUSAO'
      await this.$refs.modalRef.show()
      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve
        this.promiseReject = reject
      })
    },
    async prepararAlteracao (bloco) {
      try {
        this.$v.bloco.$reset()
        this.bloco = JSON.parse(JSON.stringify(bloco))
        this.modo = 'ALTERACAO'
        await this.$refs.modalRef.show()
        return new Promise((resolve, reject) => {
          this.promiseResolve = resolve
          this.promiseReject = reject
        })
      } catch (error) {
        return new Promise((resolve, reject) => reject(new Error()))
      }
    },
    cancelar () {
      this.$refs.modalRef.hide()
    },
    confirmar () {
      this.$v.bloco.$touch()
      if (this.$v.bloco.$error || this.bloco.unidades.length === 0) {
        this.$q.notify('Preencha as informações do bloco e clique em Gerar Bloco.')
      } else {
        if (this.modo === 'ALTERACAO') {
          // Object.assign(this.value, this.bloco)
          this.promiseResolve(this.bloco)
        } else if (this.modo === 'INCLUSAO') {
          this.promiseResolve(this.bloco)
        }
        this.$refs.modalRef.hide()
      }
    },
    gerarBloco () {
      this.$v.andares.$touch()
      this.$v.unidadesPorAndar.$touch()
      if (this.$v.andares.$error || this.$v.unidadesPorAndar.$error) {
        this.$q.notify('Informe a Qtd. andares e Unidades por andar.')
      } else {
        const primeira = this.numeroPrimeiraUnidade ? this.numeroPrimeiraUnidade : 101
        this.bloco.unidades = new Array(this.andares * this.unidadesPorAndar)
        let contUnidade = 0
        let andarCorrente = Math.floor(primeira / 100)
        for (let i = 0; i < this.bloco.unidades.length; i++) {
          if (contUnidade < this.unidadesPorAndar) {
            contUnidade++
          } else {
            contUnidade = 1
            andarCorrente++
          }
          // defino o numero do andar
          this.bloco.unidades[i] = {nome: contUnidade + 100 * andarCorrente, andar: andarCorrente}
        }
      }
    },
    deletarUnidade (unidade) {
      this.bloco.unidades.splice(unidade, 1)
      // verifica se existem elementos no array
      // if (this.bloco.unidades.length > 0) this.$set(this.bloco.andar, andar, this.bloco.andar[andar])
      // else this.bloco.andar.splice(andar, 1)
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
  .botaoExcluirUnidade {
    position:absolute; top:0; right:0;
    margin:0;
  }
  .clear {
    clear: left;
  }
</style>
