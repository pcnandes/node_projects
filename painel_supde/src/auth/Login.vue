<template>
  <q-card class="absolute-center">
    <q-toolbar>
      <div class="q-toolbar-title">
        <i class="fa fa-address-card"></i>&nbsp;Login
      </div>
    </q-toolbar>
    <div style="padding: 0px 1.5em 1.5em 1.5em">
      <form @submit.prevent="login">
      <q-field>
        <q-input 
          stack-label="CPF" 
          v-model="credentials.username" 
          @blur="$v.credentials.username.$touch()"
          :error="$v.credentials.username.$error" />
      </q-field>
      <q-field>
        <q-input 
          stack-label="Senha" 
          v-model="credentials.password" 
          type="password" @blur="$v.credentials.password.$touch()" 
          :error="$v.credentials.password.$error" />
      </q-field>
      <div align="center">
        <img src="statics/captcha.png"/>
      </div>
      <q-field>
        <q-input 
          stack-label="Texto da imagem" 
          v-model="credentials.answer" 
          @blur="$v.credentials.answer.$touch()" 
          :error="$v.credentials.answer.$error" />
      </q-field>
      <p/>
      <div align="center">
        <div style="float:left">
        <img src="statics/certificado.png"/>
        </div>
        <q-btn color="primary" icon="fa-sign-in" :disabled="$v.$invalid">Entrar</q-btn>
      </div>
      </form>
    </div>
  </q-card>
</template>

<script>

import { QCard, QCardMain, QToolbar, QField, QInput, QBtn, Loading } from 'quasar'
import { required, minLength } from 'vuelidate/lib/validators'

export default {
  components: {
    QCard, QCardMain, QToolbar, QField, QInput, QBtn, Loading
  },
  data () {
    return {
      credentials: {
        username: '',
        password: '',
        challenge: '',
        answer: ''
      }
    }
  },
  validations: {
    credentials: {
      username: {
        required,
        minLength: minLength(11)
      },
      password: {
        required,
        minLength: minLength(6)
      },
      answer: {
        required,
        minLength: minLength(6)
      }
    }
  },
  methods: {
    login () {
      if (this.$v.$invalid) {
        return;
      }
      Loading.show();
      const vm = this;
      this.$store.dispatch('auth/login', this.credentials)
        .then(res => {
          vm.credentials.username = vm.credentials.password = vm.credentials.challenge = vm.credentials.answer = '';
          Loading.hide();
          vm.$router.replace(vm.$route.query.redirect ? decodeURI(vm.$route.query.redirect) : '/');
        }).catch(res => {
          Loading.hide();
        });
    },
    alterarCaptcha () {
      // TODO:
    }
  },
  created () {
    this.$store.dispatch('auth/tryAutoLogin');
  }
}
</script>

<style>
</style>
