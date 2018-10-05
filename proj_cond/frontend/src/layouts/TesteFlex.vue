<template>
  <div class="principal">
    <div class="bloco_conteudo">
      conteudo
    </div>
    <div class="bloco_login">
      <div class="login">
        login
      </div>
    </div>
  </div>
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
.principal {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  border: 1px solid black;
  background-color: blue;
  padding: 10px;
}
.bloco_conteudo {
  flex: 4 1 auto;
  border: 1px solid black;
  background-color: yellow;
  min-width: 300px;;
}
.bloco_login {
  display: flex;
  flex: 1 1 0;
  border: 1px solid black;
  background-color: grey;
  padding: 10px;
}
.login {
  border: 1px solid black;
  background-color: pink;
  flex: 1 1 0;
  min-width: 300px;
  height: 400px;
}
</style>
