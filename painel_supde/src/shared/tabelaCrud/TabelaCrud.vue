<template>
  <div class="content">
    <div class="item">
      <q-search v-model="pesquisa" placeholder="Pesquisar" @input="onFilterText"/>
    </div>
    <div id='tabela' class="tabela-content">
      <ag-grid-vue id="grid-wrapper" class="ag-theme-material grid"
          :gridOptions="gridOptions"
          :rowData="lista"
          :gridSizeChanged="onGridSizeChanged"
          :gridReady="onGridReady"
          :paginationChanged="onPaginationChanged">
      </ag-grid-vue>
    </div>
    <div class="item">
      <p-paginador
        :pageSize="gridOptions.paginationPageSize"
        :currentPage="paginator.currentPage"
        :totalPages="paginator.totalPages"
        :totalLines="paginator.totalLines"
        @goToPage="goToPage"
        @setPageSize="setPageSize">
      </p-paginador>
    </div>
  </div>
</template>

<script>
  import {AgGridVue} from 'ag-grid-vue';
  import { LOCALE_AG_GRID, TIPO_DADO } from '../../const';
  import { formatarValores } from '../../utils.js';
  import { QSearch } from 'quasar';
  import Paginador from './PaginacaoTabela.vue';

  export default {
    data () {
      return {gridOptions: null,
        rowData: [],
        pesquisa: '',
        paginator: {currentPage: 0, pageSize: 0, totalPages: 0, totalLines: 0}
      }
    },
    props: {
      lista: {type: Array, required: true},
      // Array {titulo: 'Titulo Coluna', nome: 'Nome coluna', tamanho: 100, tipo: 'Data, DataHora, Hora..', formato: 'DD/MM/YYYY', linkDetalhe: 'true'}
      colunas: {type: Array, required: true},
      filtro: {type: Boolean, required: false},
      possuiExclusao: {type: Boolean, required: false}
    },
    components: {
      'ag-grid-vue': AgGridVue, QSearch, 'p-paginador': Paginador
    },
    created () {
      this.gridOptions = {
        // teoricamente isso seria usado para outra coisa, mas aparentemente
        // resolveu o problema da barra de rolagem horizontal
        // é preciso mais testes
        scrollbarWidth: 60,
        // nao sei oq faz
        rowData: null,
        // ajusta automaticamente o tamanho das colunas
        // onGridReady: (params) => params.api.sizeColumnsToFit(),
        enableSorting: true,
        animateRows: true,
        enableColResize: true,
        sortingOrder: ['desc', 'asc', null],
        // paginacao
        pagination: true,
        paginationPageSize: 50,
        // internacionalização
        localeText: LOCALE_AG_GRID,
        // oculta a paginação
        suppressPaginationPanel: true,
        // permite a comunicação entre a TabelaCrud.vue e a tabela do agGrid.
        // usando a chamada this.params.context.componentParent o agGrid consegue
        // chamar metodos do TabelaCrud.vue
        context: {
          componentParent: this
        },
        onCellClicked: this.disparaDetalhe,
        unSortIcon: true
      };
      this.gridOptions.columnDefs = this.montarColunas();
      // this.gridOptions.columnDefs = this.colunas.map(x => ({headerName: x.titulo, field: x.nome}))
      this.gridOptions.defaultColDef = {
        // usa filtro 'text' por padrão
        filter: 'agTextColumnFilter',
        enableSorting: true,
        enableFilter: false,
        editable: false
      }
      this.gridOptions.columnTypes = {
        // nonEditableColumn: {editable: false},
        opcaoMenuColumn: {suppressFilter: true, maxWidth: 5}, minWidth: 5,
        dateTimeColumn: {
          // passo o formato e o retorno da comparação para o quickFilter
          valueFormatter: this.formatarDataHora,
          getQuickFilterText: this.formatarDataHora
        },
        dateColumn: {
          valueFormatter: this.formatarData,
          getQuickFilterText: this.formatarData
        }
      }
    },
    methods: {
      formatarData (params) {
        return formatarValores(params.value, TIPO_DADO.DATE, null);
      },
      formatarDataHora (params) {
        return formatarValores(params.value, TIPO_DADO.TIMESTAMP, null);
      },
      montarColunas () {
        let rows = [];
        for (let i = 0; i < this.colunas.length; i++) {
          let c = this.colunas[i];
          let r = {};
          if (c.tipo === TIPO_DADO.TIMESTAMP) {
            r.type = 'dateTimeColumn';
          }
          else if (c.tipo === TIPO_DADO.DATE) {
            r.type = 'dateColumn';
          }
          r.headerName = c.titulo;
          r.field = c.nome;
          // define o cursor
          r.cellStyle = {'cursor': 'pointer'};
          rows.push(r);
        }
        return rows;
      },
      disparaDetalhe (item) {
        this.$emit('acaoDetalhar', item.data);
      },
      onFilterText () {
        this.gridOptions.api.setQuickFilter(this.pesquisa);
      },
      // Dynamic Resizing without Horizontal Scroll
      // https://www.ag-grid.com/javascript-grid-responsiveness/#gsc.tab=0
      onGridSizeChanged (params) {
        params.api.sizeColumnsToFit();
      },
      onGridReady (params) {
        params.clientWidth = 800;
        params.api.sizeColumnsToFit();
      },
      onPaginationChanged (item) {
        if (item.api) {
          this.paginator = {
            currentPage: item.api.paginationGetCurrentPage(),
            totalPages: item.api.paginationGetTotalPages(),
            totalLines: this.lista.length
          }
        }
      },
      goToPage (page) {
        this.gridOptions.api.paginationGoToPage(page - 1);
      },
      setPageSize (pageSize) {
        this.gridOptions.api.paginationSetPageSize(Number(pageSize));
      }
    }
  }
</script>

<style  scoped>
  .content {
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    min-height: 400px;
    min-width: 500px;
  }
  .item {
  }
  .tabela-content {
    display: flex;
    flex-grow: 1;
  }
  #grid-wrapper {
    flex-grow: 1;
    width: 100%;
  }
  .cursor_row {
    background: blue;
    cursor: move;
  }

</style>
