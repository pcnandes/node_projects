<template>
  <div v-ripple.mat class="q-item q-item-division relative-position q-item-dense q-item-link" @click="trigger">
    <slot></slot>
  </div>
</template>

<script>
import { Ripple } from 'quasar'

export default {
  props: ['disabled', 'keep', 'event', 'link'],
  directives: {
    Ripple
  },
  inject: ['layout'],
  methods: {
    trigger () {
      if (!this.disabled) {
        if (!this.keep) {
          this.layout.hideCurrentSide(() => {
            this.fire();
          })
        }
        else {
          this.fire();
        }
      }
    },
    fire () {
      if (this.event) {
        this.event();
      }
      if (this.link) {
        this.$router.push({path: this.link})
      }
    }
  }
}
</script>