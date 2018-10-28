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
        <div style="padding: 50px">
          <div class="q-display-1 q-mb-md">Adicionar Bloco</div>
          tsteeeee
          <q-btn color="primary" @click="exibeModalBloco = false" label="Adicionar" />
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
      form: {
        nome: '',
        blocos: []
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
    }
  }
}
</script>

<style>
</style>
