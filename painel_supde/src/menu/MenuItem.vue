<template>
  <component :is="viewComponent" v-bind="model" @close="model.opened = false">
    <q-item-side v-if="viewComponent=='app-menu-link' && model.icon" :icon="model.icon"/>
    <q-item-main v-if="viewComponent=='app-menu-link'" :label="model.label" />
    <app-menu-item v-for="(child,index) in model.children" :key="index" :model="child" v-show="child.visible"></app-menu-item>
  </component>
</template>

<script>

import { QCollapsible, QItemSide, QItemMain } from 'quasar'
import MenuLink from './MenuLink'

export default {
  name: 'app-menu-item',
  props: ['model'],
  components: {
    QCollapsible,
    QItemSide,
    QItemMain,
    AppMenuLink: MenuLink
  },
  computed: {
    viewComponent () {
      return this.model.children ? 'q-collapsible' : 'app-menu-link';
    }
  }
}
</script>

<style>
.q-list-dense > .q-item, .q-item-dense {
  font-size: .8em;
}
.q-item-icon {
  font-size: 1.1em;
}
.q-item-side {
  min-width: 1.3em;
}
</style>
