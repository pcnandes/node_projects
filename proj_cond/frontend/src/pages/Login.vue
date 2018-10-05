<template>
  <q-page class="pagina flex row fit wrap tertiary">
      <div class="welcome_bloco">
        <h1>Um novo jeito de administar seu condomínio</h1>
        <ul>
          <li>facilita a comunicação entre síndico e moradores</li>
          <li>prioriza as necessidades dos condôminos</li>
          <li>livro de ocorrência online</li>
          <li>assembleia e pré assembleia online</li>
        </ul>
      </div>
      <form v-on:submit.prevent="onSubmit()" class="login_bloco column">
        <q-field>
          <q-select v-model="form.condominio" :options="condominios" placeholder="Condomínio" inverted-light color="white"/>
        </q-field>
        <q-field>
          <q-input v-model.trim="form.usuario" placeholder="Usuário" inverted-light color="white" autofocus/>
        </q-field>
        <q-field>
          <q-input v-model="form.senha" type="password" placeholder="Senha" inverted-light color="white"/>
        </q-field>
        <br/>
        <q-btn color="primary" type="submit">Login</q-btn>
        <q-checkbox v-model="lembreDeMim" label="Lembre-se de mim" />
        <a href="">Esqueci a senha</a>
    </form>
  </q-page>
</template>
<style>
</style>

<script>
import { QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QSelect, QCheckbox } from 'quasar'
export default {
  name: 'PageIndex',
  components: { QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QSelect, QCheckbox },
  data () {
    return {
      lista: [],
      form: {
        condominio: '',
        usuario: '',
        senha: ''
      },
      lembreDeMim: false,
      condominios: [{label: 'Golden Residence', value: 'golden_residence'}, {label: 'Alpha Ville', value: 'alpha_ville'}]
    }
  },
  mounted () {

  },
  created () { },
  methods: {
    login () {
      this.$axios.post('/public/login', this.credenciais)
        .then((response) => {
          console.log(response)
          this.user = response.data
        })
        .catch(() => {
          console.log('deu erro no login')
        })
    },
    onSubmit () {
      this.$auth.login({
        fetchUser: false,
        data: this.form,
        lembreDeMim: this.lembreDeMim
      })
        .then(response => {
        }, (res) => {
          console.log('Res: ', res)
        })
    }
  }
}
</script>
<style>
  .pagina {
    background-color: #2b3137;
    padding-top: 70px;
    color: white;
  }
  .welcome_bloco {
    flex: 3;
    padding-left: 10%;
    min-width: 350px;
  }
  .welcome_bloco > h1 {
    font-weight: 500;
    font-size: 35px;
    line-height: 1;
    margin-top: 50px;
    margin-bottom: 40px;
  }
  .welcome_bloco > ul {
    font-size: 18px;
    list-style-type: none;
  }
  .welcome_bloco > ul > li {
    margin-bottom: 1em;
  }
  .welcome_bloco > ul > li:last-child {
    margin-bottom: 0px;
  }
  .welcome_bloco > ul > li::before {
     font-family: "Material Icons"; content: "done ";
  }
  .login_bloco {
    background-color: #DCDCDC;
    padding: 24px;
    flex: 1 1 0;
    min-width: 350px;
    margin-left: auto;
    border-radius: 15px 0 0 0;
  }
  .login_bloco > div, button, a {
    margin-top: 15px;
  }
</style>
