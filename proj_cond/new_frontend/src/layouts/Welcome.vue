<template>
  <q-layout view="lHh Lpr lFf">
    <q-header>
      <q-toolbar>
        <q-toolbar-title>
          SINDCON
          <div class="q-toolbar-subtitle">Sistema de gestão de condomínio</div>
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
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

  }
}
</script>

<style>
  .q-toolbar__title {
    font-size: 18px;
    font-weight: 500;
    padding: 0 12px;
    LINE-HEIGHT: 20px;
  }
  .q-toolbar-subtitle {
    font-size: 12px;
    opacity: 0.7;
  }
</style>
