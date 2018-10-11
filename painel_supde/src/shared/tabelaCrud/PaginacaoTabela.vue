<template>
  <div class="row justify-end">
    <div class="row items-center justify-end paginador ">
      <span>Linhas: </span>
      <q-select v-model="linhasPorPagina"
        :options="opcoesPaginacao"
        @change="onSetPage"/>
      <span> {{ currentPage+1 }} de {{ totalPages }} até {{totalLines}} </span>
      <q-pagination v-model="page" :min="1" :max="totalPages" @input="onChange"/>
    </div>
  </div>
</template>

<script>
  import { QBtn, QPagination, QSelect } from 'quasar';

  export default {
    data () {
      return {
        page: 0, minPages: 0, maxPages: 0, linhasPorPagina: 0
        // opcPaginacao: []
      }
    },
    props: {
      pageSize: {required: true},
      currentPage: {required: true},
      totalPages: {required: true},
      totalLines: {required: true}
    },
    mounted () {
      this.page = this.currentPage + 1;
      this.linhasPorPagina = this.pageSize;
    },
    components: {
      QBtn, QPagination, QSelect
    },
    methods: {
      onChange () {
        this.$emit('goToPage', this.page)
      },
      onSetPage () {
        console.log('pageSize' + this.linhasPorPagina)
        this.$emit('setPageSize', this.linhasPorPagina)
      }
    },
    computed: {
      opcoesPaginacao () {
        let opcPaginacao = [];
        let qtdPgs = [10, 20, 50, 100, 200, 500];
        for (let i = 0; i < qtdPgs.length; i++) {
          if (this.totalLines > qtdPgs[i]) {
            opcPaginacao.push({label: qtdPgs[i] + '', value: qtdPgs[i]});
          }
        }
        // adiciono o total de linhas ao final
        if (opcPaginacao.length === 0 ||
          this.totalLines > opcPaginacao[opcPaginacao.length - 1].value) {
          opcPaginacao.push({label: this.totalLines + '', value: this.totalLines});
        }
        return opcPaginacao;
      }
    }
  }
</script>

<style  scoped>
  .paginador {
    width: 550px;
    color: grey;
  }

  .paginador > span, .paginador > .q-select, .paginador > .q-pagination{
    margin-right: 10px
  }
</style>
