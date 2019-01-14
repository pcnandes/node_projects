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
          <div class="divUnidade" v-for="(unidade, i) in bloco.unidades" :key="i">
            <q-input :value="unidade.nome"
              @input="val => {bloco.unidades[i].nome = val}"/>
            <q-btn flat dense round class="botaoExcluirUnidade material-icons primary"
              @click="deletarUnidade(i)" title="Deletar unidade" icon="delete"/>
          </div>
        </div>
        <div class="row justify-center gutter-sm">
          <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" color="faded" label="Cancelar" /></div>
          <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" color="primary" @click="fechar()" label="Confirmar" /></div>
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
  props: {
    value: {required: true, type: Object, default: () => getBlocoNew()}
  },
  data () {
    return {
      bloco: getBlocoNew(),
      andares: null,
      unidadesPorAndar: null,
      numeroPrimeiraUnidade: null
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
    exibir () {
      this.$v.bloco.$reset()
      this.bloco = JSON.parse(JSON.stringify(this.value))
      this.$refs.modalRef.show()
    },
    fechar () {
      this.$refs.modalRef.hide()
    }
  }
}
</script>
<style scoped>
</style>
