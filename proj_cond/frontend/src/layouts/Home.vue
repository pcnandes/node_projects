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
        <q-btn-dropdown flat dense icon="people" label="nome">
          <!-- dropdown content -->
          <q-list link>
            <q-item>
              <q-item-side icon="people" />
              <q-item-main>
                <q-item-tile label>Nome, unidade</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item title="Sair" @click.native="logout">
              <q-item-side icon="power_settings_new" />
              <q-item-main>
                <q-item-tile label>Item2</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-layout-header>
    <q-page-container>
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { QBtnDropdown } from 'quasar'
export default {
  components: { QBtnDropdown },
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
