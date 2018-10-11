<template>
  <div>
    <div class="border" v-if="ready">
      <q-collapsible opened icon="fa-filter" label="Filtros">
        <condicao :model="consulta.condicao" :filtros="esquema.filtros"></condicao>
      </q-collapsible>
      <q-collapsible opened icon="fa-eye" label="Exibição">
        <exibicao :model="consulta.exibicao" :esquema="esquema"></exibicao>
      </q-collapsible>
      <div style="padding: .5em; text-align: center">
        <q-btn color="primary" icon="fa-play" title="Executar a consulta" @click="executar()">Executar</q-btn>
        <q-btn color="primary" icon="fa-save" title="Salvar a consulta">Salvar</q-btn>
        <q-btn color="primary" icon="fa-folder-open" title="Abrir uma consulta salva">Abrir</q-btn>
        <q-btn color="primary" icon="fa-cubes" title="Incluir em algum dashboard">Dashboard</q-btn>
        <q-btn color="primary" icon="fa-eraser" title="Reinicia a consulta com as configurações padrão">Limpar</q-btn>
      </div>
    </div>
  </div>
</template>

<script>
import { QCollapsible, QBtn, Loading } from 'quasar'
import Condicao from '../condicao/Condicao'
import Exibicao from './exibicao/Exibicao'
import axios from 'axios'

export default {
  components: {
    QCollapsible, QBtn,
    Condicao, Exibicao
  },
  data () {
    return {
      esquema: null,
      consulta: null,
      pai: null,
      ready: false,
      resultado: null
    }
  },
  computed: {
  },
  methods: {
    carregarConsulta (nome) {
      Loading.show();
      const vm = this;
      return axios.get('consulta/' + nome)
        .then(res => {
          Loading.hide();
          vm.consulta = res.data;
          return res.data;
        })
        .catch(res => {
          Loading.hide();
          return res;
        })
    },
    /**
     * Inicializa a consulta após a obtenção assíncrona da mesma e de seu esquema de dados
     */
    inicializar () {
      if (!this.consulta.condicao) {
        this.$set(this.consulta, 'condicao', {operador: 'AND', filhos: []})
      }
      if (this.esquema && this.esquema.filtros) {
        const filtrosObrigatorios = [];
        let filtroPerfil = null;
        let multiplosFiltrosPerfil = false;
        // verifica no esquema quais são os filtros obrigatórios e os que são sensíveis ao perfil do usuário
        for (let i = 0; i < this.esquema.filtros.length; i++) {
          const filtro = this.esquema.filtros[i];
          if (filtro.obrigatorio) {
            filtrosObrigatorios.push(filtro);
          }
          else {
            if (((this.hasRole('URC') && filtro.restricao === 'URC') ||
              (!this.loggedUser.externo && filtro.restricao !== 'URC')) && filtro.restricao) {
              if (filtroPerfil) {
                multiplosFiltrosPerfil = true;
              }
              if (!filtroPerfil || filtro.prioritario) {
                filtroPerfil = filtro;
              }
            }
          }
        }
        if (filtroPerfil) {
          filtrosObrigatorios.push(filtroPerfil);
        }
        if (filtrosObrigatorios.length > 0) {
          this.consulta.condicao.operador = 'AND';
          this.$set(this.consulta.condicao, 'obrigatorio', true);
        }
        // inclui os filtros obrigatórios na condição caso já não estejam
        for (let i = 0; i < filtrosObrigatorios.length; i++) {
          const filtro = filtrosObrigatorios[i];
          const found = this.consulta.condicao.filhos.filter(x => x.filtro === filtro.nome);
          let item = found.length > 0 ? found[0] : null;
          if (!item) {
            item = {filtro: filtro.nome};
            this.consulta.condicao.filhos.push(item);
          }
          if ((filtro.restricao && !multiplosFiltrosPerfil) || filtro.obrigatorio) {
            item.obrigatorio = true;
          }
        }
      }
      if (this.consulta.condicao) {
        this.inicializarCondicao(this.consulta.condicao.filhos);
      }
      this.ready = true;
    },
    /**
     * Inicializa a árvore de condições embutindo um id serial
     */
    inicializarCondicao (condicoes) {
      if (condicoes) {
        for (let i = 0; i < condicoes.length; i++) {
          this.$set(condicoes[i], 'id', i + 1);
          this.inicializarCondicao(condicoes[i].filhos);
        }
      }
    },
    executar () {
    },
    salvar () {
    },
    dashboard () {
    },
    abrir () {
    }
  },
  created () {
    const vm = this;
    vm.carregarConsulta(this.$route.params.nome)
      .then(consulta => {
        vm.$store.dispatch('esquema/find', consulta.esquema)
          .then(esquema => {
            vm.esquema = esquema;
            vm.inicializar();
            Loading.hide();
          })
          .catch(res => {
            Loading.hide();
          });
        vm.$store.commit('setTitulo', consulta.titulo);
      });
  }
}
</script>

<style scoped>
</style>