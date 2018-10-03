<template>
  <q-page class="flex">
    <div class="row fit">
      <div class="col-8">
        testeeee
      </div>
      <div class="col-4">
        <div class="column">
          <q-field>
            <q-input placeholder="Usuário"/>
          </q-field>
          <q-field>
            <q-input type="password" placeholder="Senha"/>
          </q-field>
          <br/>
          <q-btn color="primary" @click="submit()">Login</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>
<style>
</style>

<script>
import { QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput } from 'quasar'
export default {
  name: 'PageIndex',
  components: { QBtn, QToolbar, QIcon, QToolbarTitle, QField, QInput },
  data () {
    return {
      lista: []
    }
  },
  created () { },
  methods: { }
}
</script>
<style>
  .pagina {
    backgroun-color: red;
  }
</style>
