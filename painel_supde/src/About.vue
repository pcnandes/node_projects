<template>
  <q-modal ref="about">
    <q-toolbar>
      <div class="q-toolbar-title">
        Sobre a Ferramenta
      </div>
      <q-btn flat @click="$refs.about.close()">
        <i class="fa fa-close"></i>
      </q-btn>
    </q-toolbar>
    <div class="layout-padding">
      <div align="center">
        <p>Backend</p>
        <a href="http://demoiselle.io" target="_blank"><img src="statics/demoiselle.png" class="dep-logo" title="Demoiselle Framework"/></a>
        <a href="http://www.oracle.com/technetwork/pt/java/index.html" target="_blank"><img src="statics/java.png" class="dep-logo" title="Java 8"/></a>
        <p>Frontend</p>
        <a href="https://vuejs.org/" target="_blank"><img src="statics/vue.png" class="dep-logo" title="Vue"/></a>
        <a href="http://quasar-framework.org/" target="_blank"><img src="statics/quasar.png" class="dep-logo" title="Quasar Framework"/></a>
        <a href="https://webpack.github.io/" target="_blank"><img src="statics/webpack.png" class="dep-logo" title="Webpack"/></a>
      </div>
    </div>
  </q-modal>
</template>

<script>

import { QModal, QToolbar, QBtn } from 'quasar'

export default {
  components: {
    QModal, QToolbar, QBtn
  },
  methods: {
    show () {
      this.$refs.about.open();
    }
  }
}
</script>

<style>
.dep-logo {
  width: 4em;
  height: 4em;
}
</style>
