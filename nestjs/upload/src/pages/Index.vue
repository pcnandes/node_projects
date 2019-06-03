<template>
  <q-page class="flex flex-center">
    <!-- <img alt="Quasar logo" src="~assets/quasar-logo-full.svg"> -->
    upload
    <q-uploader
      url="http://localhost:3000/upload"
      style="max-width: 300px"
      field-name="file"
    />
  </q-page>
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex'
}
</script>
