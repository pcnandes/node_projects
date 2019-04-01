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
    <q-form ref="formLogin" @submit="onSubmit()" class="login_bloco column">
      <!-- <q-select ref="condominio" v-model="form.condominio" :options="condominios"
        option-label="nome" option-value="id" label="Condomínio" @input="selecionarBloco()"
        outlined dense bg-color="grey-2" color="indigo-2" transition-show="scale" transition-hide="scale"
        :rules="[val => !!val]">
        <template v-slot:prepend>
          <q-icon name="mdi-domain" />
        </template>
      </q-select>

      <q-select ref="bloco" v-show="form.condominio" v-model="form.bloco" :options="blocos"
        option-label="nome" option-value="id" label="Bloco" @input="selecionarBloco()"
        outlined dense bg-color="grey-2" color="indigo-2" transition-show="scale" transition-hide="scale"
        :rules="[val => !!val]">
        <template v-slot:prepend>
          <q-icon name="mdi-office-building" />
        </template>
      </q-select>

      <q-input ref="usuario" v-model.trim="form.login" label="Usuário" autofocus
        outlined dense bg-color="grey-2" color="indigo-2"
        :rules="[val => !!val]">
        <template v-slot:prepend>
          <q-icon name="mdi-account" />
        </template>
      </q-input>

      <q-input ref="senha" v-model.trim="form.senha" label="Senha"
        :type="isPwd ? 'password' : 'text'"
        outlined dense bg-color="grey-2" color="indigo-2"
        :rules="[val => !!val]" >
        <template v-slot:append>
          <q-icon
            :name="isPwd ? 'visibility_off' : 'visibility'"
            class="cursor-pointer"
            @click="isPwd = !isPwd"
          />
        </template>
        <template v-slot:prepend>
          <q-icon name="mdi-textbox-password" />
        </template>
      </q-input> -->
      <my-select ref="condominio" v-show="condominios && condominios.length > 0" icon="mdi-domain" v-model="form.condominio" :options="condominios"
        option-label="nome" option-value="id" label="Condomínio" required map-options @input="selecionaBloco"/>
      <my-select ref="bloco" icon="mdi-office-building" v-show="form.condominio" v-model="form.bloco"
        :options="blocos" option-label="nome" option-value="id" label="Bloco" required map-options/>
      <my-input-text ref="usuario" icon="mdi-account" v-model.trim="form.login" label="Usuário" autofocus required />
      <my-input-password class="q-mb-lg" ref="senha" icon="mdi-textbox-password" v-model="form.senha" required />
      <q-btn color="primary" size="17px" type="submit">Login</q-btn>
      <q-checkbox v-model="form.lembreDeMim" color="blue-grey-14" label="Lembre-se de mim" />
    </q-form>
  </q-page>
</template>
<style>
</style>

<script>

import MySelect from '../shared/MySelect'
import MyInputText from '../shared/MyInputText'
import MyInputPassword from '../shared/MyInputPassword'

export default {
  name: 'Login',
  components: { 'my-input-text': MyInputText, 'my-input-password': MyInputPassword, 'my-select': MySelect },
  data () {
    return {
      isPwd: true,
      loginSemInfCondominio: false,
      condominios: [],
      form: {
        condominio: null,
        bloco: null,
        login: null,
        senha: null,
        lembreDeMim: false
      }
    }
  },
  methods: {
    onSubmit () {
      // DESCOMENTAR quando estiver OK
      let erroCondBloco = this.verificaErrosCampos([this.$refs.condominio.hasError(), this.$refs.bloco.hasError()])
      let erroUsuSenha = this.verificaErrosCampos([this.$refs.usuario.hasError(), this.$refs.senha.hasError()])
      // se nao existem condominios cadastrados, libera informar apenas login e senha
      if ((!this.loginSemInfCondominio && (erroCondBloco || erroUsuSenha)) ||
        (this.loginSemInfCondominio && erroUsuSenha)) {
        // this.$q.notify('Preencha as informaçoes de login.')
        this.alertaErro('Preencha as informaçoes de login.')
        return
      }
      this.$store.dispatch('auth/login', { 'credenciais': this.form, 'lembreDeMim': this.lembreDeMim })
        .then((res) => {
          this.$router.push('/home')
        })
    },
    listarCondominios () {
      this.$axios.get('/api/public/condominios')
        .then((res) => {
          if (!res.data || res.data.length === 0) {
            this.loginSemInfCondominio = true
          } else {
            this.condominios = res.data
            this.form.condominio = this.condominios[0]
            this.form.bloco = this.condominios[0].blocos[0]
          }
        })
        .catch((err) => {
          console.error('ERRO: ', err.response.erro, err.erro)
        })
    },
    selecionaBloco (condominio) {
      this.form.bloco = condominio.blocos[0]
    }
  },
  mounted () {
    this.listarCondominios()
  },
  computed: {
    blocos: function () {
      return this.form.condominio ? this.form.condominio.blocos : []
    }
  }
}
</script>
<style scoped>
  .q-field--with-bottom {
    padding-bottom: 0px;
  }
  .pagina_login {
    display: flex;
    min-height: 350px;
    /*align-items: stretch;*/
    flex-wrap: wrap;
    background-color: #384047;
    padding-top: 50px;
    color: #f5f5f5;
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
    margin-top: 60px;
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
    color: #455a64;
    /*
    flex: 1 1 0;
    min-width: 350px;
    margin-left: auto;
    border-radius: 15px 0 0 0;*/
  }
  .login_bloco > div, button, a {
    /* margin-top: 13px; */
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
