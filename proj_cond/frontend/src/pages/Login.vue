<template>
  <q-page class="pagina flex tertiary">
    <div class="row fit wrap">
      <div class="welcome_bloco">
        <div class="welcome_conteudo">
          <h1>SINDCON</h1>
          <h2>Sistema de gestão de condomínio</h2>
          <ul>
            <li>agiliza a comunicação entre síndico e moradores</li>
            <li>prioriza as necessidades dos condôminos</li>
            <li>livro de ocorreência online</li>
            <li>assembleia e pré assembleia online</li>
          </ul>
        </div>
      </div>
      <div class="login_bloco column justify-center">
        <q-field>
          <q-select v-model="credenciais.condominio" :options="condominios" placeholder="Condomínio" inverted-light color="white"/>
        </q-field>
        <q-field>
          <q-input v-model="credenciais.usuario" placeholder="Usuário" inverted-light color="white"/>
        </q-field>
        <q-field>
          <q-input v-model="credenciais.usuario" type="password" placeholder="Senha" inverted-light color="white"/>
        </q-field>
        <br/>
        <q-btn color="primary" @click="submit()">Login</q-btn>
        <a href="">Esqueci a senha</a>
      </div>
    </div>
  </q-page>
</template>
<style>
</style>

<script>
import { QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QSelect } from 'quasar'
export default {
  name: 'PageIndex',
  components: { QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput, QSelect },
  data () {
    return {
      lista: [],
      credenciais: {
        condominio: '',
        usuario: '',
        senha: ''
      },
      condominios: [{label: 'Golden Residence', value: 'golden_residence'}, {label: 'Alpha Ville', value: 'alpha_ville'}]
    }
  },
  mounted () {

  },
  created () { },
  methods: { }
}
</script>
<style>
  .pagina {
    background-color: #2b3137;
    padding-top: 100px;
    padding-left: 5%;
    padding-right: 5%;
    color: white;
  }
  .welcome_bloco {
    flex: 1 1 auto;
  }
  .welcome_conteudo {
    flex: 1 1 auto;
    padding-left: 15%;
  }
  .welcome_conteudo > h1 {
    font-weight: 500;
    font-size: 64px;
    line-height: 1;
    margin-bottom: 10px;
  }
  .welcome_conteudo > h2 {
    font-weight: 500;
    font-size: 32px;
    margin-bottom: 10px;
    margin-top: 0px;
    min-width: 400px;
  }
  .login_bloco {
    background-color: #DCDCDC;
    padding: 24px;
    flex: 1;
    min-width: 350px;
    height: 350px;
    margin-left: auto;
  }
  .login_bloco > div, button, a {
    margin-top: 15px;
  }
</style>
