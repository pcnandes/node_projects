<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
import { colors } from 'quasar'
colors.setBrand('negative', '#ff3333')
colors.setBrand('warning', '#ffa64d')
colors.setBrand('positive', '#5cd65c')

export default {
  name: 'App'
}
</script>

<style>
</style>
