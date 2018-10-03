<template>
  <div class="resultadosPesquisa" v-show="resultado.length > 0">
    <div class="itemResultado" v-for="item in resultado" :key="item.url"
      @click="openURL(item.url)">
      <p class="tituloResultado">{{item.titulo}}</p>
      <p class="subtituloResultado">{{item.url}}</p>
      <div v-for="e in item.encontrados" :key="e.id">
        <p class="subtituloResultado" ><span v-html="e.titulo"></span></p>
        <p class="subtituloResultado"><span v-html="e.conteudo"></span></p>
      </div>
    </div>
  </div>
</template>

<script>
import {openURL} from 'quasar'

export default {
  data () {
  },
  props: {
    resultado: {required: true}
  },
  watch: {
    value: function (newVal) {
      this.resultado = newVal
    }
  },
  methods: {
  },
  mounted () {
    console.log('resultado pesquisa')
    console.log(this.resultado)
  },
  openURL
}
</script>

<style scoped>
  .resultadosPesquisa {
    border-style: solid;
    border-width: 2px;
    border-color: rgb(117, 117, 124);
    padding: 5px;
    margin-top: 20px;
    cursor: pointer;
  }
  .itemResultado:hover {
    background-color: rgb(157, 157, 167);
  }
  .itemResultado {
    border-bottom: 1px solid  rgb(157, 157, 167);
    padding: 5px;
  }
  .tituloResultado {
    font-size: 1em;
    font-weight: bold;
    color: rgb(29, 29, 29);
    margin: 5px;
  }
  .subtituloResultado {
    font-size: 0.8em;
    color: rgb(29, 29, 29);
    margin: 5px;
  }
</style>
