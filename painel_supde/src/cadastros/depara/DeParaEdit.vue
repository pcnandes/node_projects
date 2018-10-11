<template>
  <q-card>
    <q-card-main>
      <form>
        <q-field>
          <q-input stack-label="Id" v-model="form.depara.id" disable v-if="form.depara.id"/>
        </q-field>
        <q-field>
          <q-select
            stack-label="Domínios"
            v-model="form.depara.dominio"
            :options="dominios"
            :disable="!editing"
            @blur="$v.form.depara.dominio.$touch"
            :error="$v.form.depara.dominio.$error"
          />
        </q-field>
        <q-field>
          <q-input stack-label="De" v-model="form.depara.de" :disable="!editing"
            @blur="$v.form.depara.de.$touch"
            :error="$v.form.depara.de.$error"
          />
        </q-field>
        <q-field>
          <q-input stack-label="Para" v-model="form.depara.para" :disable="!editing"
            @blur="$v.form.depara.para.$touch"
            :error="$v.form.depara.para.$error"
          />
        </q-field>
      </form>
    </q-card-main>
    <q-card-separator/>
    <q-card-actions>
      <q-btn color="primary" icon="fa-arrow-left" @click="voltar()" v-if="!editing">Voltar</q-btn>
      <q-btn color="primary" icon="fa-edit" @click="editing=true" v-if="!editing">Alterar</q-btn>
      <q-btn color="primary" icon="fa-trash" @click="excluir" v-if="!editing && hasRole('ADMINISTRADOR')">Excluir</q-btn>
      <q-btn color="primary" icon="fa-save" @click="salvar()" v-if="editing">Salvar</q-btn>
      <q-btn color="primary" icon="fa-close" @click="cancelar()" v-if="editing">Cancelar</q-btn>
    </q-card-actions>
  </q-card>
</template>
<script>
  import axios from 'axios'
  import { DOMINIOS } from './const'
  import { QCard, QCardMain, QCardTitle, QCardSeparator, QCardActions, QField, QInput, QBtn, QSelect, QAutocomplete, QChipsInput, Loading, Dialog, QRadio, Toast } from 'quasar'
  import { required } from 'vuelidate/lib/validators'

  export default {
    components: {
      QCard, QCardMain, QCardTitle, QCardSeparator, QCardActions, QField, QInput, QBtn, QSelect, QAutocomplete, QChipsInput, QRadio, Loading, Toast
    },
    data () {
      return {
        form: {
          depara: {}
        },
        dominios: DOMINIOS.map(i => ({label: i, value: i})),
        editing: false,
        id: this.$route.params.id
      }
    },
    validations: {
      form: {
        depara: {
          dominio: { required },
          de: { required },
          para: { required }
        }
      }
    },
    methods: {
      salvar () {
        this.$v.form.$touch();
        if (this.$v.form.$error) {
          Toast.create['negative']({
            html: 'Verificar o preenchimento do formulário.'
          })
          return
        }
        let inclusao = !this.form.depara.id;
        this.editing = false;
        Loading.show();
        const vm = this;
        axios.put('depara', this.form.depara)
          .then(res => {
            vm.form.depara = res.data;
            vm.$store.dispatch('alert/add', {
              icon: 'fa-check',
              color: 'positive',
              message: 'Apuração especial atualizado com sucesso',
              timeout: 4000
            });
            Loading.hide();
            if (inclusao) {
              this.$router.go(-1);
            }
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
        const vm = this;
        Dialog.create({
          title: 'Confirmação',
          message: 'Deseja excluir o item ' + this.form.depara.id + '?',
          buttons: [
            'Não',
            {
              label: 'Sim',
              handler () {
                vm.editing = false;
                Loading.show();
                axios.delete('depara/' + vm.id)
                  .then(res => {
                    console.log(vm.$store);
                    vm.$store.dispatch('alert/add', {
                      icon: 'fa-check',
                      color: 'positive',
                      message: 'Apuração especial excluída com sucesso',
                      timeout: 4000
                    });
                    Loading.hide();
                    vm.$router.push('/depara');
                  })
                  .catch(res => {
                    Loading.hide();
                    vm.reload();
                  })
              }
            }
          ]
        })
      },
      reload () {
        // novo
        if (!this.id) {
          this.editing = true;
          this.form.depara = {id: null,
            dominio: '',
            de: '',
            para: ''
          }
        }
        else {
          this.editing = false;
          Loading.show();
          const vm = this;
          axios.get('depara/' + vm.id)
            .then(res => {
              Loading.hide();
              vm.form.depara = res.data;
              vm.$store.commit('setTitulo', 'Item De-Para: ' + res.data.id)
            })
            .catch(res => {
              Loading.hide();
              vm.$store.dispatch('alert/add', {
                icon: 'fa-warning',
                color: 'negative',
                message: 'Item ' + vm.id + ' não encontrada',
                timeout: 4000
              });
              vm.$router.push('/depara')
            })
        }
      },
      cancelar () {
        if (!this.id) {
          this.voltar();
        }
        else {
          this.reload();
        }
      }
    },
    mounted () {
      this.reload();
    }
  }
</script>

