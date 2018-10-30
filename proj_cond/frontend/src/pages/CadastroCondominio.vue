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
        <div class="row justify-center" style="padding: 50px">
          <div class="q-display-1 q-mb-md">Cadastro Bloco</div>
          <div class="row col-12 justify-between">
            <q-field :count="10" class="col-5">
              <q-input v-model="bloco.andares" type="number" float-label="N. de Andares"/>
            </q-field>
            <q-field :count="10" class="col-5">
              <q-input v-model="bloco.unidadesPorAndar" type="number" float-label="Unidades por andar"
                @blur="gerarPredio()"/>
            </q-field>
            <q-btn color="primary" @click="gerarPredio()" label="Gerar Prédio" />
          </div>
          {{bloco.unidades}}
          <div class="row col-12 justify-center">
            <q-btn color="faded" @click="exibeModalBloco = false" label="Cancelar" />
            <q-btn color="primary" @click="exibeModalBloco = false" label="Adicionar" />
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
      }
    }
  },
  validations: {
    form: {
      condominio: { required },
      usuario: { required },
      senha: { required }
    }
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
        console.log(this.bloco.andares, this.bloco.unidadesPorAndar)
        this.bloco.unidades = new Array(this.bloco.andares)
        for (let i = 0; i < this.bloco.unidades.length; i++) {
          this.bloco.unidades[i] = new Array(this.bloco.unidadesPorAndar)
          for (let y = 0; y < this.bloco.unidades[i].length; y++) {
            this.bloco.unidades[i][y] = (i + 1) * 100 + y + 1
          }
        }
      }
    }
  }
}
</script>

<style>
</style>
