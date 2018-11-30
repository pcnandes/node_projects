<template>
  <!-- <q-layout view="lHh Lpr lFf"> -->
  <q-layout view="hHh Lpr lff">
    <q-layout-header>
      <q-toolbar color="blue-9">
        <q-btn flat dense round @click="leftDrawerOpen = !leftDrawerOpen" aria-label="Menu">
          <q-icon name="menu" />
        </q-btn>
        <q-toolbar-title>
          <router-link to="/home" class="logo_nome">SINDCON</router-link>
          <span slot="subtitle">Sistema de gestão de condomínio</span>
        </q-toolbar-title>
        <q-btn flat round dense icon="notification_important" title="Mensagens"/>
        <q-btn-dropdown flat dense :label="$store.state.auth.usuario.login">
          <!-- dropdown content -->
          <q-list link>
            <!-- <q-item>
              <q-item-side icon="people" />
              <q-item-main>
                <q-item-tile label>{{$store.state.auth.usuario.login}}</q-item-tile>
              </q-item-main>
            </q-item> -->
            <q-item title="Cadastro" @click.native="logout">
              <q-item-side icon="people" />
              <q-item-main>
                <q-item-tile label>Cadastro</q-item-tile>
              </q-item-main>
            </q-item>
            <q-item title="Efetua logout do sistema" @click.native="logout">
              <q-item-side icon="power_settings_new" />
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
        <!--
        <q-item to="cadastro_condominio" @click.native="closeMenu()">
          <q-item-side icon="business" />
          <q-item-main label="Cadastro condomínio"/>
        </q-item>
        <q-item to="agenda_condominio" @click.native="closeMenu()">
          <q-item-side icon="today" />
          <q-item-main label="Agenda Condomínio"/>
        </q-item>
        <q-item to="cadastro_morador" @click.native="closeMenu()">
          <q-item-side icon="person" />
          <q-item-main label="Cadastro morador"/>
        </q-item>
        <q-item to="cadastro_colaborador" @click.native="closeMenu()">
          <q-item-side icon="perm_contact_calendar" />
          <q-item-main label="Cadastro colaboradores"/>
        </q-item>
        <q-item to="pre_assembleia" @click.native="closeMenu()">
          <q-item-side icon="question_answer" />
          <q-item-main label="Pré-assembleia"/>
        </q-item>
        <q-item to="assembleia" @click.native="closeMenu()">
          <q-item-side icon="gavel" />
          <q-item-main label="Assembléia"/>
        </q-item>
        <q-item to="livro_ocorrencia" @click.native="closeMenu()">
          <q-item-side icon="assignment" />
          <q-item-main label="Livro de Ocorrência"/>
        </q-item>
        <q-item to="chat_sindico" @click.native="closeMenu()">
          <q-item-side icon="chat"/>
          <q-item-main label="Fale com o Síndico"/>
        </q-item>
      </q-list> -->
    </q-layout-drawer>
    <q-page-container class="bg-faded">
      <router-view/>
    </q-page-container>
  </q-layout>
</template>

<script>
import { QBtnDropdown } from 'quasar'
import routes from '../router/routes'
export default {
  components: { QBtnDropdown },
  name: 'Home',
  data () {
    return {
      leftDrawerOpen: false
    }
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
    }
  },
  methods: {
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
    padding-top: 5px;
    /*
    padding-left: 5%;
    padding-right: 5%; */
  }
  .barra-botoes {
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
  }
  .barra-botoes > div {
    padding-left: 16px;
  }
  .material-icons.primary { color: #5a5a5a; }
  .material-icons.light_gray { color: #9c9b9b; }
  @media (max-width: 575px) {
    .pagina {
      max-width: 100%;
    }
  }
</style>
