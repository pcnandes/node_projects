<template>
  <q-layout view="hHh Lpr lff">
    <q-header>
      <q-toolbar color="blue-9">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="mdi-menu" />
        </q-btn>
        <q-toolbar-title>
          <router-link to="/home" class="logo_nome">{{titulo}}</router-link>
          <div class="q-toolbar-subtitle">{{subtitulo}}</div>
        </q-toolbar-title>
        <q-btn flat round dense icon="mdi-message-text" title="Mensagens"/>
        <q-btn-dropdown flat dense :label="getUsuarioLogado.login">
          <!-- dropdown content -->
          <q-list>
            <q-item title="Cadastro" clickable @click="abrirCadastroUsuario">
              <q-item-section avatar >
                 <q-icon name="mdi-account" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Cadastro</q-item-label>
              </q-item-section>
            </q-item>
            <q-item title="Efetua logout do sistema" clickable @click="logout">
              <q-item-section avatar >
                 <q-icon name="mdi-exit-to-app" />
              </q-item-section>
              <q-item-section>
                <q-item-label>Sair</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
      </q-toolbar>
    </q-header>
    <q-drawer
      v-model="leftDrawerOpen"
      :breakpoint="500"
      bordered
      content-class="bg-grey-3"
    >
      <q-list v-for="(item, i) in itensMenu" :key="i" >
        <q-item clickable v-ripple :to="item.path" @click.native="closeMenu()">
          <q-item-section avatar>
            <q-icon :name="item.icone" />
          </q-item-section>
          <q-item-section>
            {{ item.tituloMenu }}
          </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>
    <q-page-container class="bg-faded">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
// import TrocarSenha from '../pages/TrocarSenha'

import routes from '../router/routes'
export default {
  // components: { TrocarSenha },
  name: 'Home',
  data () {
    return {
      leftDrawerOpen: false,
      subtitulo: 'SICOND - Sistema de Gestão de Condomínios'
    }
  },
  computed: {
    titulo () {
      return this.getCondominioLogin ? this.getCondominioLogin.nome : 'SICOND'
    },
    itensMenu () {
      let retorno = []
      retorno = routes.filter(rota => rota.itemMenu)
      /*
      routes.forEach(route => {
        if (route.children && route.children.length > 0) {
          route.children.forEach(rotaFilha => {
            if (rotaFilha.itemMenu) retorno.push(rotaFilha)
            if (rotaFilha.children && rotaFilha.children.length > 0) {
              rotaFilha.children.forEach(rotaNeta => {
                if (rotaNeta.itemMenu) retorno.push(rotaNeta)
              })
            }
          })
          /*
          let rotas = route.children.filter(children => {
          // TODO verificar permissoes de usuario
            return children.itemMenu
          })
          // retorno = retorno.concat(rotas)
    }
      }) */
      console.log('menu', retorno)
      return retorno
    }
  },
  mounted () {
    // this.carregaTitulo()
  },
  methods: {
    /* carregaTitulo () {
      if (this.possuiPerfil('ADMIN')) {
        this.titulo = 'SICOND'
        this.subtitulo = 'Sistema de Gestão de Condomínios'
      } else if (this.getCondominioLogin) {
        this.titulo = this.getCondominioLogin.nome
        this.subtitulo = 'SICOND - Sistema de Gestão de Condomínios'
      }
    }, */
    abrirCadastroUsuario () {
      let u = this.getUsuarioLogado.unidade
      if (u) this.$router.push(`/condominio/${u.bloco.condominio.id}/${u.bloco.id}/${u.id}`)
      else this.$router.push(`/cadastro/${u.bloco.condominio.id}/${u.bloco.id}/${u.id}`)
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
  .q-toolbar__title {
    font-size: 18px;
    font-weight: 500;
    padding: 0 12px;
    LINE-HEIGHT: 20px;
  }
  .q-toolbar-subtitle {
    font-size: 12px;
    opacity: 0.7;
  }
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
    margin-bottom: 40px;
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
      min-width: 150px;
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
