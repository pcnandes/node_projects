<template>
  <div class="layout-padding">
    <q-data-table :data="usuarios" row-key="cpf" :columns="columns" :config="config" @rowclick="onRowClick">
    </q-data-table>
  </div>
</template>

<script>
import { QDataTable, Dialog, Loading } from 'quasar'
import axios from 'axios'

export default {
  components: {
    QDataTable
  },
  data () {
    return {
      usuarios: [],
      columns: [
        {
          label: 'Nome',
          field: 'nome',
          filter: true,
          sort: true,
          type: 'string'
        },
        {
          label: 'Lotação',
          field: 'lotacao',
          filter: true,
          sort: true,
          type: 'string'
        },
        {
          label: 'Perfis',
          field: 'perfis',
          filter: true,
          sort: false,
          type: 'string',
          format (value, row) {
            let roles = '';
            if (value) {
              for (let i = 0; i < value.length; i++) {
                if (roles.length > 0) {
                  roles += ', ';
                }
                if (value[i] !== 'SERPRO') {
                  roles += value[i];
                }
              }
            }
            return roles;
          }
        }
      ],
      config: {
        columnPicker: false,
        pagination: {
          rowsPerPage: 20,
          options: [20]
        },
        messages: {
          noData: '<i class="fa fa-warning"/> Nenhum usuário disponível',
          noDataAfterFiltering: '<i class="fa fa-warning"/> Nenhum usuário encontrado para o filtro configurado'
        },
        labels: {
          columns: 'Colunas',
          allCols: 'Todas as colunas',
          rows: 'Linhas',
          selected: {
            singular: 'usuário selecionado',
            plural: 'usuários selecionados'
          },
          clear: 'limpar',
          search: 'Busca',
          all: 'Todas'
        }
      }
    }
  },
  methods: {
    onRowClick (row) {
      this.$router.push('/usuario/' + row.cpf);
    },
    novoUsuario () {
      Dialog.create({
        title: 'Novo Usuário',
        form: {
          cpf: {
            type: 'text',
            label: 'CPF',
            model: ''
          }
        },
        buttons: [
          'Cancela',
          {
            label: 'Confirma',
            handler (data) {
              this.$router.push('/usuario/' + data.cpf);
            }
          }
        ]
      });
    }
  },
  mounted () {
    this.$store.commit('setTitulo', 'Usuários e Perfis');
    Loading.show();
    const vm = this;
    axios.get('usuario?alteraveis')
      .then(res => {
        Loading.hide()
        vm.usuarios = res.data;
      })
      .catch(res => {
        Loading.hide()
      })
  }
}
</script>

<style>

</style>
