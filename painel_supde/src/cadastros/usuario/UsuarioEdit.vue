<template>
  <q-card>
    <q-card-main v-if="!!usuario">
      <form>
        <q-field>
          <q-input stack-label="Lotação" v-model="usuario.lotacao" :disable="true"/>
        </q-field>
        <q-select float-label="Perfis" chips multiple v-model="usuario.perfis" :options="perfis" :disable="!editing"/>
        <q-chips-input float-label="Visibilidade" chips multiple v-model="usuario.visibilidade" :options="perfis" :disable="!editing" v-if="editing || (usuario.visibilidade && usuario.visibilidade.length > 0)"/>
        <q-select float-label="Esquemas" chips multiple v-model="usuario.esquemas" :options="esquemas" :disable="!usuario.externo || !editing" v-if="editing || (usuario.esquemas && usuario.esquemas.length > 0)"/>
      </form>
    </q-card-main>
    <q-card-separator/>
    <q-card-actions v-if="!!usuario">
      <q-btn flat icon="fa-arrow-left" @click="voltar()" v-if="!editing">Voltar</q-btn>
      <q-btn flat icon="fa-edit" @click="editing=true" v-if="!editing && !myself">Alterar</q-btn>
      <q-btn flat icon="fa-trash" @click="excluir" v-if="!editing && usuario.externo && hasRole('ADMINISTRADOR')">Excluir</q-btn>
      <q-btn flat icon="fa-save" @click="salvar()" v-if="editing">Salvar</q-btn>
      <q-btn flat icon="fa-close" @click="reload()" v-if="editing">Cancelar</q-btn>
    </q-card-actions>
  </q-card>
</template>

<script>
import axios from 'axios'
import { PERFIL } from '../../const'
import { QCard, QCardMain, QCardTitle, QCardSeparator, QCardActions, QField, QInput, QBtn, QSelect, QAutocomplete, QChipsInput, Loading, Dialog } from 'quasar'

export default {
  components: {
    QCard, QCardMain, QCardTitle, QCardSeparator, QCardActions, QField, QInput, QBtn, QSelect, QAutocomplete, QChipsInput, Loading
  },
  data () {
    return {
      usuario: null,
      editing: false,
      esquemas: []
    }
  },
  computed: {
    /**
     * Indica se o usuário atual está vendo a si mesmo
     */
    myself () {
      return this.usuario && this.usuario.cpf === parseInt(this.$store.getters['auth/user'].cpf);
    },
    perfis () {
      return Object.keys(PERFIL).map(field => {
        return {value: field, label: PERFIL[field]}
      });
    }
  },
  methods: {
    hasRole (role) {
      return this.$store.getters['auth/hasRole'](role);
    },
    salvar () {
      this.editing = false;
      Loading.show();
      const vm = this;
      axios.put('usuario', this.usuario)
        .then(res => {
          vm.usuario = res.data;
          vm.$store.dispatch('alert/add', {
            icon: 'fa-check',
            color: 'positive',
            message: 'Usuário atualizado com sucesso',
            timeout: 4000
          });
          Loading.hide();
        })
        .catch(res => {
          Loading.hide();
          vm.reload();
        })
    },
    voltar () {
      this.$router.go(-1);
    },
    excluir () {
      Dialog.create({
        title: 'Confirmação',
        message: 'Deseja excluir o usuário ' + this.usuario.nome + '?',
        buttons: [
          'Não',
          {
            label: 'Sim',
            handler () {
              console.log('Usuário excluído')
            }
          }
        ]
      })
    },
    reload () {
      this.editing = false;
      Loading.show();
      const vm = this;
      axios.get('usuario/' + this.$route.params.cpf)
        .then(res => {
          Loading.hide();
          vm.usuario = res.data;
          vm.$store.commit('setTitulo', 'Usuário: ' + res.data.nome)
        })
        .catch(res => {
          Loading.hide();
          vm.$store.dispatch('alert/add', {
            icon: 'fa-warning',
            color: 'negative',
            message: 'CPF ' + vm.$route.params.cpf + ' não encontrado',
            timeout: 4000
          });
          vm.$router.push('/usuario')
        })
      this.$store.dispatch('esquema/list')
        .then(esquemas => {
          vm.esquemas = esquemas.map(x => {
            return {value: x.nome, label: x.titulo}
          })
        })
    }
  },
  mounted () {
    this.reload();
  }
}
</script>

<style>

</style>
