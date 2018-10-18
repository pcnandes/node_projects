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
        <q-btn flat round dense icon="people" title="usuário"/>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
