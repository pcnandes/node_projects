<template>
  <q-page class="pagina_login tertiary">
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
          <q-select v-model="form.condominio" :options="condominios" placeholder="selecione seu condomínio"
            inverted-light color="white"
            @input="id => {carregarBlocos(id)}"
            @blur="$v.form.condominio.$touch"
            :error="$v.form.condominio.$error">
          </q-select>
        </q-field>
        <q-field v-if="form.condominio">
          <q-select v-model="form.bloco" :options="blocos" placeholder="selecione seu bloco"
            inverted-light color="white"
            @blur="$v.form.bloco.$touch"
            :error="$v.form.bloco.$error"/>
        </q-field>
        <q-field>
          <q-input v-model.trim="form.login" placeholder="Usuário"
            inverted-light color="white" autofocus
            @blur="$v.form.login.$touch"
            :error="$v.form.login.$error"/>
        </q-field>
        <q-field>
          <q-input v-model="form.senha" type="password" placeholder="Senha"
            inverted-light color="white"
            @blur="$v.form.senha.$touch" :error="$v.form.senha.$error"/>
        </q-field>
        <q-btn class="btn-login" color="primary" type="submit">Login</q-btn>
        <q-checkbox v-model="lembreDeMim" label="Lembre-se de mim" />
        <a href="">Esqueci a senha</a>
    </form>
  </q-page>
</template>
<style>
</style>

<script>
import { QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QSelect, QCheckbox } from 'quasar'
import { required } from 'vuelidate/lib/validators'
import axios from 'axios'

export default {
  name: 'PageIndex',
  components: { QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QSelect, QCheckbox },
  data () {
    return {
      loginSemInfCondominio: false,
      condominios: [],
      blocos: [],
      form: {
        condominio: null,
        bloco: null,
        login: null,
        senha: null
      },
      lembreDeMim: false
    }
  },
  validations: {
    form: {
      condominio: { required },
      bloco: { required },
      login: { required },
      senha: { required }
    }
  },
  methods: {
    onSubmit () {
      this.$v.form.$touch()
      // se nao existem condominios cadastrados, libera informar apenas login e senha
      if ((!this.loginSemInfCondominio && this.$v.form.$error) ||
        (this.loginSemInfCondominio && this.$v.form.login.$error && this.$v.form.senha.$error)) {
        this.$q.notify('Preencha as informaçoes de login.')
        return
      }
      this.$store.dispatch('auth/login', {'credenciais': this.form, 'lembreDeMim': this.lembreDeMim})
        .then((res) => {
          this.$router.push('/home')
        })
    },
    listarCondominios () {
      axios.get('/api/public/condominios')
        .then((res) => {
          console.log(res)
          if (!res.data || res.data.length === 0) {
            this.loginSemInfCondominio = true
          } else {
            this.condominios = res.data.map(c => {
              let retorno = { label: c.nome, value: c.id, blocos: [] }
              retorno.blocos = c.blocos.map(bloco => ({ label: bloco.nome, value: bloco.id }))
              return retorno
            })
          }
        })
        .catch((err) => {
          console.error('ERRO: ', err.response.erro, err.erro)
          // this.alertaErro(err.message)
        })
    },
    carregarBlocos (condominioId) {
      if (condominioId) {
        this.blocos = this.condominios.find(c => c.value === this.form.condominio).blocos
        if (this.blocos && this.blocos.length === 1) {
          this.form.bloco = this.blocos[0].value
        }
      }
    }
  },
  mounted () {
    this.listarCondominios()
  }
}
</script>
<style scoped>
  .pagina_login {
    display: flex;
    min-height: 350px;
    /*align-items: stretch;*/
    flex-wrap: wrap;
    background-color: #2b3137;
    padding-top: 70px;
    color: white;
  }
  .welcome_bloco {
    /*flex: 3;
    padding-left: 10%;
    min-width: 350px;*/
    flex-grow: 4;
    min-width: 350px;
    padding-left: 10%;
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
  .btn-login {
    margin-top: 40px;
  }
  .login_bloco {
    background-color: #DCDCDC;
    padding: 24px;
    flex-grow: 1;
    min-width:350px;
    border-radius: 15px 0 0 0;
    /*
    flex: 1 1 0;
    min-width: 350px;
    margin-left: auto;
    border-radius: 15px 0 0 0;*/
  }
  .login_bloco > div, button, a {
    margin-top: 15px;
  }

  @media (max-width: 575px) {
    .pagina_login {
      padding-top: 0px;
    }
    .welcome_bloco > h1 {
      font-size: 25px;
      margin: 20px 10px 15px 10px;
    }
    .welcome_bloco > ul {
      font-size: 12px;
    }
    .welcome_bloco > ul > li {
      margin-bottom: .5em;
    }
    .btn-login {
      margin-top: 15px;
    }
  }
</style>
