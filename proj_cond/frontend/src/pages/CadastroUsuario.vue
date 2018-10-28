<template>
  <q-page>
    Cadastro de usuários (moradores (será no cadatro do condominio), sindico, auxiliar sindico, porteiros)
    <ul>
      <li>Criar pré-cadatro de moradores</li>
      <li>definir bloco e apartamento</li>
      <li>Cadastrar morador (nome, sexo, idade, email e celular)</li>
      <li>Cadastrar pessoas autorizadas</li>
      <li>Definir senha padrao ou gerar senha aleatoria enviar senha</li>
      <li>zerar senha</li>
    </ul>
  </q-page>
</template>

<script>
import { QBtn, QField, QInput } from 'quasar'
import { required } from 'vuelidate/lib/validators'

export default {
  name: 'CadastroMorador',
  components: { QBtn, QField, QInput },
  data () {
    return {
      form: {
        bloco: '',
        unidade: ''
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

<style scoped>
</style>
