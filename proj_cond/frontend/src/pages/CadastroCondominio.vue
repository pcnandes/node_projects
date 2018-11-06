<template>
   <q-page padding class="docs-input row justify-center">
    <div style="width: 500px; max-width: 90vw;" >
      <q-field :count="50" helper="Nome do condomínio" >
        <q-input v-model="form.nome" float-label="Nome do Condomínio"/>
      </q-field>
      <br/>
      <div class="row justify-center">
        <q-btn label="Adicionar bloco" @click="exibeModalBloco = true" color="primary"/>
      </div>
      <q-modal v-model="exibeModalBloco" :content-css="{minWidth: '50vw'}">
        <div class="doc-container justify-center gutter-y-sm" style="padding: 20px;">
            <div class="row justify-center q-display-1">Cadastro Bloco</div>
            <div class="row gutter-sm" >
              <q-field :count="10" class="col-md-6 col-xs-12">
                <q-input v-model="bloco.nome" type="text" float-label="Nome do bloco"/>
              </q-field>
              <q-field :count="10" class="col-md-6 col-xs-12">
                <q-input v-model="bloco.numeroPrimeiraUnidade" type="number" float-label="n. primeira Unidade"/>
              </q-field>
              <q-field :count="10" class="col-md-6 col-xs-12">
                <q-input v-model="bloco.andares" type="number" float-label="n. Andares do bloco"/>
              </q-field>
              <q-field :count="10" class="col-md-6 col-xs-12">
                <q-input v-model="bloco.unidadesPorAndar" type="number" float-label="Unidades por andar"/>
              </q-field>
              <div class="col-12 row justify-end">
                <q-btn class="col-xs-12 col-md-auto" color="secondary" @click="gerarPredio()" label="Gerar bloco" />
              </div>
            </div>
            <div>
              {{classUnidade}}
              <div class="row col-10 justify-center" v-for="(andar, i) in bloco.unidades" :key="i">
                <!--q-mr-sm q-mb-sm divUnidade-->
                <div class="col-auto divUnidade" v-for="(unidade, y) in andar" :key="y">
                  <q-input
                    :value="unidade"
                    @change="val => {model = val}"
                  />
                  <q-btn flat dense round class="botaoExcluirUnidade material-icons primary"
                    @click="deletarUnidade(i, y)" title="Deletar unidade" icon="delete">
                  </q-btn>
                </div>
              </div>
            </div>

            <div class="row justify-center gutter-sm">
              <div class="row col-xs-12  col-md-auto"><q-btn class="col-xs-12" color="faded" @click="exibeModalBloco = false" label="Cancelar" /></div>
              <div class="row col-xs-12  col-md-auto"><q-btn class="col-xs-12" color="primary" @click="exibeModalBloco = false" label="Adicionar" /></div>
            </div>
        </div>
      </q-modal>

      Cadastro de colaboradores
      <ul>
        <li>Criar cadastro de porteiros e outros empregados contendo nome e horário de trabalho</li>
      </ul>
    </div>
   </q-page>
</template>

<script>
import { QBtn, QField, QInput, QModal } from 'quasar'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CadastroMorador',
  components: { QBtn, QField, QInput, QModal },
  data () {
    return {
      exibeModalBloco: false,
      /*
      condominio = {
        nome:'',
        blocos = [{
          andares: 0,
          unidadesPorAndar: 0,
          unidades: [][]}]
        }
      }, */
      bloco: {
        nome: '',
        numeroPrimeiraUnidade: '',
        andares: '',
        unidadesPorAndar: '',
        unidades: [] // esse cara serua uma matriz}
      },
      form: {
        nome: '',
        blocos: {
          andares: 0,
          unidadesPorAndar: 0,
          unidades: [] // esse cara serua uma matriz
        }
      },
      classUnidade: 'col-auto'
    }
  },
  validations: {
    form: {
      condominio: { required },
      usuario: { required },
      senha: { required }
    }
  },
  computed: {

  },
  mounted () {

  },
  created () { },
  methods: {
    onSubmit () {
      this.$v.form.$touch()
      if (this.$v.form.$error) {
        this.$q.notify('Preencha as informaçoes de login.')
        return
      }
      this.$store.dispatch('auth/login', {'credenciais': this.form, 'lembreDeMim': this.lembreDeMim})
        .then((res) => {
          console.log('sucesso login? ', res)
          if (res) {
            console.log('login com sucesso redirecionar para a pagina')
            this.$router.push('/home')
          } else console.log('deu erro no login')
        })
    },
    gerarPredio () {
      if (this.bloco.andares && this.bloco.unidadesPorAndar) {
        console.log('gerandoPredio')
        const primeira = this.bloco.numeroPrimeiraUnidade ? this.bloco.numeroPrimeiraUnidade : 101
        this.bloco.unidades = new Array(this.bloco.andares)
        for (let i = 0; i < this.bloco.unidades.length; i++) {
          this.bloco.unidades[i] = new Array(this.bloco.unidadesPorAndar)
          for (let y = 0; y < this.bloco.unidades[i].length; y++) {
            this.bloco.unidades[i][y] = i * 100 + primeira + y
          }
        }
        // TODO ver se vale implementar regra
        // this.classUnidade = this.bloco.unidadesPorAndar <= 10 ? 'col-1' : 'col-2'
      }
    },
    deletarUnidade (andar, unidade) {
      this.bloco.unidades[andar].splice(unidade, 1)
      console.log(this.bloco)
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
   @media (max-width: 575px) {
    .divUnidade {
      margin-bottom: 5px;
      margin-right: 5px;
      min-width: 60px!important;;
      max-width: 70px!important;;
    }
   }
</style>
