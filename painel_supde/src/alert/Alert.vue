<template>
  <div class="alerts">
    <q-alert v-for="alert in alerts" :key="alert.id" :color="alert.color" :icon="alert.icon"
      v-model="alert.visible"
      @dismiss-end="remove(alert.id)"
      enter="bounceInRight"
      leave="bounceOutRight"
      appear
      dismissible>
      <span v-html="alert.message"></span>
    </q-alert>
  </div>
</template>

<script>

import { QAlert } from 'quasar'

export default {
  components: {
    QAlert
  },
  computed: {
    alerts () {
      return this.$store.getters['alert/list'];
    }
  },
  methods: {
    remove (id) {
      this.$store.commit('alert/remove', id);
    }
  }
}
</script>

<style scoped>
.alerts {
  position: fixed;
  top: 0;
  right: 0;
  width: 0px;
  height: 0px;
  overflow: visible;
  z-index: 999999999;
  font-size: .8em;
}
.alerts > * {
  float: right;
  margin-top: 10px;
}
</style>