<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="hHh Lpr lff">
    <q-layout-header>
      <q-toolbar color="blue-9">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="mdi-menu" />
        </q-btn>
        <q-toolbar-title>
          <router-link to="/home" class="logo_nome">SINDCON</router-link>
          <span v-if="nomeCondominio"> - {{nomeCondominio}}</span>
          <span slot="subtitle">Sistema de gestão de condomínio</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="mdi-message-text" title="Mensagens"/>
        <q-btn-dropdown flat dense :label="getUsuarioLogado.login">
          <!-- dropdown content -->
          <q-list link>
            <!-- <q-item>
              <q-item-side icon="people" />
              <q-item-main>
                <q-item-tile label>{{$store.state.auth.usuario.login}}</q-item-tile>
              </q-item-main>
            </q-item> -->
            <q-item title="Cadastro" @click.native="abrirCadastroUsuario">
              <q-item-side icon="mdi-account" />
              <q-item-main>
                <q-item-tile label>Cadastro</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item title="Efetua logout do sistema" @click.native="logout">
              <q-item-side icon="mdi-exit-to-app" />
              <q-item-main>
                <q-item-tile label>Sair</q-item-tile>
              </q-item-main>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-layout-header>
    <q-layout-drawer
      v-model="leftDrawerOpen"
      :content-class="$q.theme === 'mat' ? 'bg-grey-2' : null"
    >
      <q-list no-border link inset-delimiter>
        <q-item v-for="(item, i) in itensMenu" :key="i" :to="item.path" @click.native="closeMenu()">
          <q-item-side :icon="item.icone" />
          <q-item-main :label="item.tituloMenu"/>
        </q-item>
      </q-list>
    </q-layout-drawer>
    <q-page-container class="bg-faded">
      <!-- <div class="pagina">
      <div class="barra-navegacao">
        <q-breadcrumbs class="barra-navegacao" color="grey-8">
          <q-breadcrumbs-el v-for="(item, i) in getNavItens" :key="i"
            :label="item.label" :to="item.uri" />
        </q-breadcrumbs>
      </div> -->
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { QBtnDropdown, colors, QBreadcrumbs, QBreadcrumbsEl } from 'quasar'

import routes from '../router/routes'
export default {
  components: { QBtnDropdown, colors, QBreadcrumbs, QBreadcrumbsEl },
  name: 'Home',
  data () {
    return {
      leftDrawerOpen: false
    }
  },
  created () {
    colors.setBrand('negative', '#BA4747')
    colors.setBrand('primary', '#1565c0')
  },
  computed: {
    itensMenu () {
      let retorno = []
      routes.forEach(route => {
        if (route.children && route.children.length > 0) {
          let rotas = route.children.filter(children => {
          // TODO verificar permissoes de usuario
            return children.itemMenu
          })
          retorno = retorno.concat(rotas)
        }
      })
      return retorno
    },
    nomeCondominio () {
      if (this.getUsuarioLogado.unidade) return this.getUsuarioLogado.unidade.bloco.condominio.nome
      else return null
    }
  },
  methods: {
    abrirCadastroUsuario () {
      let u = this.getUsuarioLogado.unidade
      this.$router.push(`/condominio/${u.bloco.condominio.id}/${u.bloco.id}/${u.id}`)
    },
    logout () {
      this.$store.dispatch('auth/logout')
        .then(this.$router.push('/'))
    },
    closeMenu () {
      this.leftDrawerOpen = false
    }
  }
}
</script>

<style>
  .logo_nome{
    text-decoration: none;
    color: inherit;
  }
  .pagina {
    margin: 0 auto; /*centralizo meu elemento na pagina*/
    width: 100%;
    max-width: 85vw; /*defino um tamanho maximo caso o site seja aberto em dispositivos com muita resolução*/
    background-color: rgb(247, 247, 247);
    padding: 20px;
    /*
    padding-left: 5%;
    padding-right: 5%; */
  }
  .formulario {
    min-height: calc(100vh - 450px);
  }
  .barra-botoes {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-content: space-between;
      margin-top: 20px;
    }
    .barra-botoes > button {
      margin-right: 20px;
      min-width: 200px;
    }
/*
  .barra-navegacao {
    background-color: rgb(221, 221, 221);
    margin-top: -20px;
    margin-left: -20px;
    margin-right: -20px;
    margin-bottom: 15px;
    padding: 10px;
    height: 45px;
  }

  .barra-botoes-principal {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    background-color: rgb(221, 221, 221);
    border-width: 1px;
    border-color: rgb(187, 187, 187);
    border-style: solid;
    border-radius: 10px;
    padding-bottom: 10px;
    padding-top: 10px;
    margin-top: 20px;
    align-content: space-between;
  }
  .barra-botoes-principal > div {
    padding-right: 20px;
  } */

  .material-icons.primary { color: #5a5a5a; }
  .material-icons.light_gray { color: #9c9b9b; }

  @media (max-width: 575px) {
    .pagina {
      max-width: 100%;
    }
    .barra-botoes {
      flex-direction: column;
      margin-right: 0px;
      margin-left: 0px;
    }
    .barra-botoes > button {
      padding-right: 0px;
      padding-left: 0px;
      margin-right: 0px;
      margin-bottom: 10px;
    }
    /*
    .barra-botoes-principal {
      flex-direction: column;
      padding: 0px;
      padding-bottom: 10px;
    }
    .barra-botoes-principal > div {
      padding-left: 10px;
      padding-right: 10px;
      padding-top: 10px;
    }
    .barra-botoes > div {
      padding-right: 10px;
      padding-left: 10px;
    } */
  }
</style>
