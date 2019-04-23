<template>
  <q-dialog persistent ref="modalRef" :maximized="isMobile">
    <q-card style="minWidth: 850px" class="bg-grey-4">
      <q-bar dark class="bg-primary text-white" style="height: 40px">
        <q-icon name="mdi-office-building" size="30px"/>
        <div class="col text-center text-weight-bold">Cadastro Bloco</div>
        <q-space />
        <i class="material-icons">
          <q-tooltip>Essa tela facilitará a criação de um bloco. Informe o 'Quantidade de andares' e 'Unidades por andar' para 'Gerar Bloco'. Caso a 'Primeira unidade' nao seja a 101, informe.</q-tooltip>
          help
        </i>
        <q-btn dense flat icon="close" v-close-popup size="14px">
          <q-tooltip>Fechar / Cancelar</q-tooltip>
        </q-btn>
      </q-bar>
      <my-form ref="form" class="doc-container justify-center gutter-y-sm row" style="padding: 20px;">
        <my-input-text ref="nome" v-model.trim="bloco.nome"
          counter max-length="50" label="Nome" autofocus required
          class="col-12" />
        <my-input-number ref="numeroPrimeiraUnidade" v-model="numeroPrimeiraUnidade" v-if="modo==='INCLUSAO'"
          label="n. Primeira Unidade" class="col-4" :max-length="3"/>
        <my-input-number ref="andares" v-model="andares" v-if="modo==='INCLUSAO'"
          label="Qtd. andares" class="col-4" :max-length="2" required/>
        <my-input-number ref="unidadesPorAndar" v-model="unidadesPorAndar" v-if="modo==='INCLUSAO'"
          label="Unidades por andar" class="col-4" :max-length="3" required/>

        <div class="col-12 row justify-end" v-if="modo==='INCLUSAO'">
          <q-btn class="col-md-auto q-my-md" size="17px" color="secondary"
            @click="gerarBloco()" label="Gerar bloco" />
        </div>

        <div class="row col-12 justify-center">
          <div style="display: table;">
            <div class="divUnidade"
              v-bind:class="[unidade.andar !== bloco.unidades[Math.max(i - 1,0)].andar ? 'clear' : '']"
              v-for="(unidade, i) in bloco.unidades" :key="i">
              <q-input :value="unidade.nome" dense
                @input="val => {bloco.unidades[i].nome = val}"/>
              <q-btn flat dense round class="botaoExcluirUnidade material-icons primary"
                @click="deletarUnidade(i)" title="Deletar unidade" icon="mdi-delete"/>
            </div>
          </div>
        </div>
        <div class="barra-botoes">
          <q-btn color="grey-14" @click="cancelar()" label="Cancelar" size="17px" />
          <q-btn color="primary" @click="confirmar()" label="Confirmar" size="17px" />
        </div>
      </my-form>
    </q-card>
  </q-dialog>
</template>

<script>
import { getBlocoNew } from './mixin.js'
import MyInputText from '../../shared/MyInputText'
import MyInputNumber from '../../shared/MyInputNumber'
import MyForm from '../../shared/MyForm'

export default {
  components: { MyInputText, MyInputNumber, MyForm },
  data () {
    return {
      bloco: getBlocoNew(),
      andares: null,
      unidadesPorAndar: null,
      numeroPrimeiraUnidade: null,
      promiseResolve: null,
      promiseReject: null,
      modo: 'INCLUSAO'
    }
  },
  methods: {
    async prepararInclusao () {
      // this.$v.bloco.$reset()
      this.limparTela()
      this.modo = 'INCLUSAO'
      await this.$refs.modalRef.show()
      return new Promise((resolve, reject) => {
        this.promiseResolve = resolve
        this.promiseReject = reject
      })
    },
    async prepararAlteracao (bloco) {
      try {
        // this.$v.bloco.$reset()
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
      this.$refs.form.tratarErros().then((ok) => {
        if (ok) {
          if (this.bloco.unidades.length === 0) {
            this.alertaErro('Preencha as informações do bloco e clique em Gerar Bloco.')
          } else {
            if (this.modo === 'ALTERACAO') {
              this.promiseResolve(this.bloco)
            } else if (this.modo === 'INCLUSAO') {
              this.promiseResolve(this.bloco)
            }
            this.$refs.modalRef.hide()
          }
        }
      })
    },
    gerarBloco () {
      if (this.$refs.andares.hasError() || this.$refs.unidadesPorAndar.hasError()) {
        this.alertaErro('Informe a Qtd. andares e Unidades por andar para poder gerar o bloco.')
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
          this.bloco.unidades[i] = { nome: contUnidade + 100 * andarCorrente, andar: andarCorrente }
        }
      }
    },
    deletarUnidade (unidade) {
      this.bloco.unidades.splice(unidade, 1)
      // verifica se existem elementos no array
      // if (this.bloco.unidades.length > 0) this.$set(this.bloco.andar, andar, this.bloco.andar[andar])
      // else this.bloco.andar.splice(andar, 1)
    },
    limparTela () {
      this.bloco = getBlocoNew()
      this.andares = null
      this.unidadesPorAndar = null
      this.numeroPrimeiraUnidade = null
      // this.$refs.nome.resetValidation()
      // this.$refs.andares.resetValidation()
      // this.$refs.unidadesPorAndar.resetValidation()
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
