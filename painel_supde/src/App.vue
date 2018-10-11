<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <q-layout ref="layout" view="hHh Lpr lff" :left-breakpoint="0">
      <q-toolbar slot="header">
        <q-btn flat @click="$refs.layout.toggleLeft()" title="Menu do Sistema" v-if="isAuthenticated">
          <i class="fa fa-bars" aria-hidden="true"></i>
        </q-btn>

        <q-toolbar-title class="app-title" title="Voltar à página inicial">
          <router-link tag="span" to="/" exact>Informações da SUPDE</router-link>
        </q-toolbar-title>
        <q-toolbar-title>
          {{titulo}}
          <div slot="subtitle" ng-if="!!subtitulo">{{subtitulo}}</div>
        </q-toolbar-title>

        <q-btn flat title="Avisos" v-if="isAuthenticated">
          <i class="fa fa-bell faa-flash animated"></i>
        </q-btn>
        <q-btn flat title="Meus Perfis" v-if="isAuthenticated" @click="profile">
          <i class="fa fa-user"></i>
        </q-btn>
        <q-btn flat title="Sair" @click="logout" v-if="isAuthenticated">
          <i class="fa fa-power-off"></i>
        </q-btn>
      </q-toolbar>

      <div slot="left">
        <q-toolbar>
          <q-toolbar-title>
          Menu
          </q-toolbar-title>
        </q-toolbar>
        <app-menu v-if="isAuthenticated"></app-menu>
      </div>
      <router-view :key="$route.fullPath"></router-view>
    </q-layout>

    <app-alert></app-alert>
  </div>
</template>

<script>

import 'quasar-extras/animate/fadeIn.css'
import 'quasar-extras/animate/fadeOut.css'
import { QLayout, QToolbar, QToolbarTitle, QBtn } from 'quasar'
import { mapGetters } from 'vuex'
import Alert from './alert/Alert'
import Menu from './menu/Menu'

export default {
  components: {
    QLayout,
    QToolbar,
    QToolbarTitle,
    QBtn,
    AppMenu: Menu,
    AppAlert: Alert
  },
  computed: {
    ...mapGetters(['titulo', 'subtitulo'])
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout');
    },
    profile () {
      this.$router.push('/usuario/' + this.$store.getters['auth/user'].cpf);
    }
  },
  mounted () {
    this.$refs.layout.hideLeft();
  }
}
</script>

<style>
.app-title {
  flex: none;
  cursor: pointer;
}
.layout-padding {
  padding: 1.5em;
}

.border {
  border-width: 1px;
  border-color: #ddd;
  border-style: solid;
}

.border-rounded {
  border-radius: 4px;
}

.border-primary {
  border-color: #027be3;
}

.flex {
	-webkit-flex: 1 1 auto;
	-ms-flex: 1 1 auto;
	flex: 1 1 auto;
}
* {
  text-shadow: none;
}

/* acrescento as propriedades flex ao main para propagar o uso de 100% da pagina */
main {
  display: flex;
  flex-direction: column;
}
/* Propriedades que devem ser incluídas no elemento pai das páginas */
.pagina-curd {
  display: flex;
  flex-direction: column;
	width: 100%;
  margin: 0 auto;
  padding: 10px;
  /* faz efeito tipo modal
  max-width: 1280px;
  box-shadow: 0px 0px 0px 9999px rgba(0, 0, 0, 0.75); */
  flex-grow: 1;
}
</style>
