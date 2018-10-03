<template>
  <q-layout view="hHh Lpr lFf">
    <q-layout-header>
      <q-toolbar
        color="indigo"
      >
      <!--
        :glossy="$q.theme === 'mat'"
        :inverted="$q.theme === 'ios'"
      -->

      <!--
        <q-btn
          flat
          dense
          round
          @click="leftDrawerOpen = !leftDrawerOpen"
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>
      -->
        <q-toolbar-title>
          <a href="#" @click="$router.push('/')">Buscador SUPDE</a>
          <!--<div slot="subtitle">Ferramenta de busca da SUPDE</div>-->
        </q-toolbar-title>
      </q-toolbar>
    </q-layout-header>

    <!--
    <q-layout-drawer
      v-model="leftDrawerOpen"
      content-class="bg-grey-3"
    >
      <q-list
        no-border
        link
        inset-delimiter
      >
        <q-list-header>Links Principais</q-list-header>
        <q-item @click.native="openURL('https://analise.bicorporativo.serpro/painelsupde/')">
          <q-item-main label="PainelSUPDE" sublabel="analise.bicorporativo.serpro" />
        </q-item>
        <q-item @click.native="openURL('https://portal.alm.serpro.gov.br/')">
          <q-item-main label="Portal ALM" sublabel="portal.alm" />
        </q-item>
      </q-list>
    </q-layout-drawer>-->

    <q-layout-drawer side="left" v-model="exibeMenuFacetas" content-class="bg-grey-4">
      <!--<facetas-count v-model='alvoPesquisa' :facetas='facetas' @executaAcao="executarPesquisa()"></facetas-count> -->
      <facetas-count @executaAcao="executarPesquisa"></facetas-count>
    </q-layout-drawer>

    <q-page-container class="bg-faded">
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
// import { openURL } from 'quasar'
import FacetasCount from '../shared/facetasCount/facetasCount'

export default {
  name: 'LayoutDefault',
  components: {
    FacetasCount
  },
  data () {
    return { }
  },
  /*
  vuex: {
    getters: {
      exibeMenuFacetas: store => store.exibeMenuFacetas,
      teste: store => store.facetaTipos
    }
  }, */
  methods: {
    // openURL
    executarPesquisa (item) {
      console.log('chegou aqui' + item)
    }
  },
  computed: {
    exibeMenuFacetas: {
      get () {
        return this.$store.state.example.exibeMenuFacetas
      }
    }
  }
}
</script>

<style >
.pagina {
    margin: 0 auto; /*centralizo meu elemento na pagina*/
    width: 100%;
    /*max-width: 1200px; /*defino um tamanho maximo caso o site seja aberto em dispositivos com muita resolução*/
    background-color: rgb(247, 247, 247);
    padding-top: 5px;
    padding-left: 5%;
    padding-right: 5%;
  }
a:link, a:visited, a:hover, a:active{
  text-decoration: none;
  color: white;
}
</style>
