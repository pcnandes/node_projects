<template>
    <q-card class="lista">
      <q-card-actions inline >
        <q-btn color="primary" @click="novo">Criar Novo</q-btn>
      </q-card-actions>
      <p-tabela-crud
        :colunas='colunas'
        :lista='apes'
        :possuiExclusao="true"
        @acaoDetalhar='detalhar'>
      </p-tabela-crud>
      <!--
      <p-tabela-simples
        :colunas='colunas'
        :lista='apes'
        @acaoDetalhar='detalhar'>
      </p-tabela-simples>
      -->
    </q-card>
</template>

<script>
  import axios from 'axios';
  import TabelaCrud from '../../shared/tabelaCrud/TabelaCrud.vue';
  import TabelaSimples from '../../shared/tabela/tabela.vue';
  import { TIPO_DADO } from '../../const';
  import { Loading, QCard, QCardSeparator, QCardActions, QField, QBtn } from 'quasar'
  export default {
    components: {
      QCard, QCardSeparator, QCardActions, QField, QBtn,
      'p-tabela-crud': TabelaCrud,
      'p-tabela-simples': TabelaSimples
    },
    data () {
      return {
        apes: [],
        colunas: [
          {titulo: 'Id', nome: 'id', linkDetalhe: true},
          {titulo: 'Script', nome: 'conteudo'},
          {titulo: 'Base de Dados', nome: 'baseDeDados'},
          {titulo: 'Criação', nome: 'dataCriacao', tipo: TIPO_DADO.TIMESTAMP},
          {titulo: 'Execução', nome: 'dataExecucao', tipo: TIPO_DADO.TIMESTAMP}
        ]
      }
    },
    methods: {
      detalhar (apes) {
        this.$router.push('/apes/' + apes.id);
      },
      novo () {
        this.$router.push('/apes/novo');
      }
    },
    mounted () {
      this.$store.commit('setTitulo', 'Cadastro de Apurações Especiais');
      Loading.show();
      const vm = this;
      axios.get('apes')
        .then(res => {
          Loading.hide()
          vm.apes = res.data;
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
