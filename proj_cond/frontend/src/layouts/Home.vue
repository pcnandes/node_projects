<template>
  <q-layout view="lHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="blue-9"
      >
        <q-toolbar-title>
          SINDCON
          <div slot="subtitle">Sistema de gestão de condomínio</div>
        </q-toolbar-title>
        <q-btn flat round dense icon="mail" title="Mensagens"/>
        <q-btn flat round dense icon="people" title="Usuário"/>
        <q-btn flat round dense icon="power_settings_new" title="Sair" @click="logout"/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
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
</style>
