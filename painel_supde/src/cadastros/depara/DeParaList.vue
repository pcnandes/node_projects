<template>
    <q-card class="lista">
      <q-card-actions inline >
        <q-btn color="primary" @click="novo">Criar Novo</q-btn>
      </q-card-actions>
      <q-field>
        <q-select
          stack-label="Domínios"
          v-model="dominio"
          :options="dominios"
        />
      </q-field>
      <p-tabela-crud
        :colunas='colunas'
        :lista='lista'
        :possuiExclusao="true"
        @acaoDetalhar='detalhar'>
      </p-tabela-crud>
    </q-card>
</template>

<script>
  import axios from 'axios';
  import { DOMINIOS } from './const';
  import TabelaCrud from '../../shared/tabelaCrud/TabelaCrud.vue';
  import { Loading, QCard, QCardSeparator, QCardActions, QField, QSelect, QBtn } from 'quasar'
  export default {
    components: {
      QCard, QCardSeparator, QCardActions, QField, QSelect, QBtn,
      'p-tabela-crud': TabelaCrud
    },
    data () {
      return {
        lista: [],
        dominio: '',
        dominios: DOMINIOS.map(i => ({label: i, value: i})),
        colunas: [
          {titulo: 'Id', nome: 'id', linkDetalhe: true},
          {titulo: 'Domínio', nome: 'dominio'},
          {titulo: 'De', nome: 'de'},
          {titulo: 'Para', nome: 'para'}
        ]
      }
    },
    methods: {
      detalhar (depara) {
        this.$router.push('/depara/' + depara.id);
      },
      novo () {
        this.$router.push('/depara/novo');
      }
    },
    mounted () {
      this.$store.commit('setTitulo', 'Cadastro de tabela de-para');
      Loading.show();
      const vm = this;
      axios.get('depara')
        .then(res => {
          Loading.hide()
          vm.lista = res.data;
        })
        .catch(res => {
          Loading.hide()
        })
    }
  }
</script>

<style scoped>
  .lista {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    padding: 10px;
  }
</style>
