<template>
  <div>
    <div style="padding:.5em">
      <q-search v-model="search" :debounce="1000" placeholder="Buscar" @change="buscar" @clear="buscar"></q-search>
      <q-alert v-if="empty" color="warning" icon="fa-warning" appear>
        Menu não encontrado
      </q-alert>
    </div>
    <app-menu-item v-for="(item,index) in menu" :key="index" :model="item" v-show="item.visible"></app-menu-item>
  </div>
</template>

<script>

import Vue from 'vue'
import axios from 'axios'
import MenuItem from './MenuItem.vue'
import { QSearch, QAlert } from 'quasar'
import { regexAcentuacao } from '../utils.js'

export default {
  components: {
    QSearch, QAlert,
    appMenuItem: MenuItem
  },
  data () {
    return {
      search: '',
      empty: false,
      menu: [
        { label: 'Início', icon: 'fa-home', link: '/' },
        { label: 'Consultas', icon: 'fa-cubes', opened: true, children: [
          { label: 'Carregando...', icon: 'fa-repeat faa-spin animated', disabled: true }
        ]},
        { label: 'Perfis', icon: 'fa-group', link: '/usuario', role: 'HABILITADOR' },
        { label: 'Limpar dados locais', icon: 'fa-refresh', event: this.limparCache, keep: true },
        { label: 'Administração', icon: 'fa-gears', opened: false, children: [
          { label: 'Aviso', icon: 'fa-bell', link: '/aviso' },
          { label: 'Cedidos', icon: 'fa-handshake-o', link: '/cedidos' },
          { label: 'De-Para', icon: 'fa-random', link: '/depara' },
          { label: 'Linguagens', icon: 'fa-flag', link: '/linguagem' },
          { label: 'Monitoramento', icon: 'fa-tachometer', link: '/monitoramento', role: 'ADMINISTRADOR' },
          { label: 'APES', icon: 'fa-code', link: '/apes', role: 'ADMINISTRADOR' },
          { label: 'Projeto SGI-ALM', icon: 'fa-puzzle-piece', link: '/projeto-sgi-alm' },
          { label: 'Relato Mantis-ALM', icon: 'fa-bug', link: '/relato-mantis-alm' },
          { label: 'Tipos de verificação', icon: 'fa-check-square-o', link: '/verificacoes' }
        ]},
        { label: ' Sair', icon: 'fa-power-off', event: this.logout, link: '/' }
      ]
    }
  },
  computed: {
    searchRegex () {
      if (this.search && this.search.length > 0) {
        return regexAcentuacao(this.search);
      }
      return null;
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('auth/logout');
    },
    /**
     *
     */
    limparCache () {
      // TODO:
      location.reload()
    },
    /**
     * Método fake para itens de menu sem efeito
     */
    dummy () {
    },
    /**
     * Atualiza o menu com o servidor
     */
    atualizarMenu () {
      const vm = this;
      vm.menu[1].children = [{ label: 'Carregando...', icon: 'fa-repeat faa-spin animated', event: vm.dummy, disabled: true, keep: true, visible: true }];
      axios.get('menu')
        .then(res => {
          if (res.data && res.data.length > 0) {
            vm.menu[1].children = res.data;
            this.empty = !vm._completarMenu(this.menu[1].children);
          }
          else {
            vm.menu[1].children[0].label = 'Nenhuma consulta disponível';
            vm.menu[1].children[0].icon = 'fa-warning';
          }
        })
        .catch(res => {
          vm.menu[1].children = [{ label: 'Falha ao carregar o menu', icon: 'fa-warning', event: vm.atualizarMenu, visible: true, keep: true }];
        })
    },
    /**
     * Completa a hierarquia de menus verificando a visibilidade e busca
     */
    _completarMenu (menu, parent) {
      let one = false;
      for (let i = 0; i < menu.length; i++) {
        // verifica se o usuário possui perfil para acessar o menu
        menu[i].visible = !menu[i].role || this.hasRole(menu[i].role);
        const found = (menu[i].visible && (!this.searchRegex || menu[i].label.match(this.searchRegex)));
        if (menu[i].children) {
          // submenu
          menu[i].dense = true;
          menu[i].visible = this._completarMenu(menu[i].children, found || parent);
          if (menu[i].visible && this.searchRegex) {
            // se a busca estiver no modo busca, e encontrou algum nó da árvore então abre o menu
            menu[i].opened = true;
          }
        }
        else {
          menu[i].visible = found || parent;
        }
        Vue.set(menu, i, menu[i]);
        one = one || menu[i].visible;
      }
      return one || parent;
    },
    /**
     * Executa a busca na árvore de menus
     */
    buscar () {
      this.empty = !this._completarMenu(this.menu);
    }
  },
  created () {
    this.empty = !this._completarMenu(this.menu);
    this.atualizarMenu();
  }
}
</script>

<style>

</style>
