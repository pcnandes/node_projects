<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="hHh Lpr lff">
    <q-layout-header>
      <q-toolbar color="blue-9">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <router-link to="/home" class="logo_nome">SINDCON</router-link>
          <span slot="subtitle">Sistema de gestão de condomínio</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="notification_important" title="Mensagens"/>
        <q-btn-dropdown flat dense :label="$store.state.auth.usuario.login">
          <!-- dropdown content -->
          <q-list link>
            <!-- <q-item>
              <q-item-side icon="people" />
              <q-item-main>
                <q-item-tile label>{{$store.state.auth.usuario.login}}</q-item-tile>
              </q-item-main>
            </q-item> -->
            <q-item title="Cadastro" @click.native="logout">
              <q-item-side icon="people" />
              <q-item-main>
                <q-item-tile label>Cadastro</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item title="Efetua logout do sistema" @click.native="logout">
              <q-item-side icon="power_settings_new" />
              <q-item-main>
                <q-item-tile label>Sair</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list no-border link inset-delimiter>
        <q-item to="cadastro_condominio">
          <q-item-side icon="business" />
          <q-item-main label="Cadastro condomínio"/>
        </q-item>
        <q-item to="agenda_condominio">
          <q-item-side icon="today" />
          <q-item-main label="Agenda Condomínio"/>
        </q-item>
        <q-item to="cadastro_morador">
          <q-item-side icon="person" />
          <q-item-main label="Cadastro morador"/>
        </q-item>
        <q-item to="cadastro_colaborador">
          <q-item-side icon="perm_contact_calendar" />
          <q-item-main label="Cadastro colaboradores"/>
        </q-item>
        <q-item to="pre_assembleia">
          <q-item-side icon="question_answer" />
          <q-item-main label="Pré-assembleia"/>
        </q-item>
        <q-item to="assembleia">
          <q-item-side icon="gavel" />
          <q-item-main label="Assembléia"/>
        </q-item>
        <q-item to="livro_ocorrencia">
          <q-item-side icon="assignment" />
          <q-item-main label="Livro de Ocorrência"/>
        </q-item>
        <q-item to="chat_sindico">
          <q-item-side icon="chat"/>
          <q-item-main label="Fale com o Síndico"/>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { QBtnDropdown } from 'quasar'
export default {
  components: { QBtnDropdown },
  name: 'Home',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout')
        .then(this.$router.push('/'))
    }
  }
}
</script>

<style>
.logo_nome{
  text-decoration: none;
  color: inherit;
}
</style>
