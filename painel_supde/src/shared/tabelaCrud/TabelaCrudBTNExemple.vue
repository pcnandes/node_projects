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
        :pageSize="paginator.pageSize"
        :currentPage="paginator.currentPage"
        :totalPages="paginator.totalPages"
        :totalLines="paginator.totalLines"
        @goToPage="goToPage">
      </p-paginador>
    </div>
  </div>
</template>

<script>
  import {AgGridVue} from 'ag-grid-vue';
  import { LOCALE_AG_GRID, TIPO_DADO } from '../../const';
  import { formatarValores } from '../../utils.js';
  import { Dialog, QSearch } from 'quasar';
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
      'ag-grid-vue': AgGridVue, QSearch, 'p-paginador': Paginador,
      ExcluirItemLista: {
        template: '<a href="#" @click="emitirExcluirLinhaInterno()" title="Excluir"><i class="fa fa-trash" aria-hidden="true"/></a>',
        methods: {
          emitirExcluirLinhaInterno () {
            // em node consigo pegar os dados, numero da linha, coluna, etc.
            // console.log(this.params.node.data);
            // dispara a ação excluir passando a linha
            this.params.context.componentParent.disparaExclusao(this.params.node.data);
          }
        }
      },
      DetalharItemLista: {
        template: '<a href="#" @click="emitirDetalharLinhaInterno" title="Detalhar">{{ params.value }}</a>',
        methods: {
          emitirDetalharLinhaInterno () {
            this.params.context.componentParent.disparaDetalhe(this.params.node.data);
          }
        }
      }
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
        }
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
          // inclui template de detalhamento
          if (c.linkDetalhe) {
            r.cellRendererFramework = 'DetalharItemLista';
          }
          rows.push(r);
        }
        // incluir coluna de exclusao
        if (this.possuiExclusao) {
          rows.push({
            headerName: '',
            field: 'excluir',
            cellRendererFramework: 'ExcluirItemLista',
            colId: 'params',
            // opcaoMenu esta definido em this.gridOptions.columnTypes
            type: 'opcaoMenuColumn'
          })
        }
        return rows;
      },
      disparaDetalhe (item) {
        this.$emit('acaoDetalhar', item);
      },
      disparaExclusao (item) {
        Dialog.create({
          title: '<i class="fa fa-exclamation-triangle" aria-hidden="true" style="color:#ffb366"></i> <font style="color:#696969">Confirma exclusao?</font>',
          buttons: ['Não',
            {label: 'Sim', handler: () => this.$emit('acaoExcluir', item)}]
        })
      },
      onFilterText () {
        this.gridOptions.api.setQuickFilter(this.pesquisa);
      },
      // Dynamic Resizing without Horizontal Scroll
      // https://www.ag-grid.com/javascript-grid-responsiveness/#gsc.tab=0
      onGridSizeChanged (params) {
        console.log(params.clientWidth);
        params.clientWidth = 800;
        console.log(params.clientWidth);
        // ajusta largura
        let gridWidth = document.getElementById('grid-wrapper').offsetWidth;
        let columnsToShow = [];
        let columnsToHide = [];
        let totalColsWidth = 0;
        let allColumns = params.columnApi.getAllColumns();
        for (let i = 0; i < allColumns.length; i++) {
          let column = allColumns[i];
          totalColsWidth += column.getMinWidth();
          if (totalColsWidth > gridWidth) {
            columnsToHide.push(column.colId);
          }
          else {
            columnsToShow.push(column.colId);
          }
        }
        params.columnApi.setColumnsVisible(columnsToShow, true);
        params.columnApi.setColumnsVisible(columnsToHide, false);
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
            pageSize: item.api.paginationGetPageSize(),
            totalPages: item.api.paginationGetTotalPages(),
            totalLines: this.lista.length
          }
        }
      },
      goToPage (page) {
        this.gridOptions.api.paginationGoToPage(page - 1);
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
</style>
