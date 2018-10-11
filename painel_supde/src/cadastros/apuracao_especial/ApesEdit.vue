<template>
  <q-card>
    <q-card-main>
      <form>
        <q-field>
          <q-input stack-label="Id" v-model="form.apes.id" disable v-if="form.apes.id"/>
        </q-field>
        <q-field>
          <q-input type="textarea" stack-label="SQL" :min-rows="10" :max-rows="10" v-model="form.apes.conteudo" :disable="!editing"
            @blur="$v.form.apes.conteudo.$touch"
            :error="$v.form.apes.conteudo.$error"
          />
        </q-field>
        <div class="row">
          <q-field class="col-8">
            <q-input stack-label="Status" v-model="form.apes.status" disable/>
          </q-field>
          <q-field class="col-4" label="Base de Dados">
            <q-radio v-model="form.apes.baseDeDados" val="OLTP" color="secondary" label="OLTP" :disable="!editing" />
            <q-radio v-model="form.apes.baseDeDados" val="OLAP" color="amber" label="OLAP" :disable="!editing" />
          </q-field>
          <q-field class="col-6">
            <data-hora label="Data de Criação" v-model="form.apes.dataCriacao" disable/>
          </q-field>
          <q-field class="col-6">
            <data-hora label="Data de Execução" v-model="form.apes.dataExecucao" :disable="!editing"
              @blur="$v.form.apes.dataExecucao.$touch"
              :error="$v.form.apes.dataExecucao.$error"
            />
          </q-field>
        </div>
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
  import DataHora from '../../shared/dataHora/DataHora.vue';
  import { QCard, QCardMain, QCardTitle, QCardSeparator, QCardActions, QField, QInput, QBtn, QSelect, QAutocomplete, QChipsInput, Loading, Dialog, QRadio, date, Toast } from 'quasar'
  import { required } from 'vuelidate/lib/validators'

  export default {
    components: {
      QCard, QCardMain, QCardTitle, QCardSeparator, QCardActions, QField, QInput, QBtn, QSelect, QAutocomplete, QChipsInput, QRadio, Loading, DataHora, date, Toast
    },
    data () {
      return {
        form: {
          apes: {}
        },
        editing: false,
        id: this.$route.params.id
      }
    },
    validations: {
      form: {
        apes: {
          conteudo: { required },
          dataExecucao: { required }
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
        let inclusao = !this.form.apes.id;
        this.editing = false;
        Loading.show();
        const vm = this;
        axios.put('apes', this.form.apes)
          .then(res => {
            vm.form.apes = res.data;
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
          message: 'Deseja excluir a apuração especial ' + this.form.apes.id + '?',
          buttons: [
            'Não',
            {
              label: 'Sim',
              handler () {
                vm.editing = false;
                Loading.show();
                axios.delete('apes/' + vm.id)
                  .then(res => {
                    console.log(vm.$store);
                    vm.$store.dispatch('alert/add', {
                      icon: 'fa-check',
                      color: 'positive',
                      message: 'Apuração especial excluída com sucesso',
                      timeout: 4000
                    });
                    Loading.hide();
                    vm.$router.push('/apes');
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
          this.form.apes = {id: null,
            conteudo: '',
            status: 'PENDENTE',
            baseDeDados: 'OLAP',
            dataCriacao: Date.now(),
            dataExecucao: null
          }
        }
        else {
          this.editing = false;
          Loading.show();
          const vm = this;
          axios.get('apes/' + vm.id)
            .then(res => {
              Loading.hide();
              vm.form.apes = res.data;
              vm.$store.commit('setTitulo', 'Apuração Especial: ' + res.data.id)
            })
            .catch(res => {
              Loading.hide();
              vm.$store.dispatch('alert/add', {
                icon: 'fa-warning',
                color: 'negative',
                message: 'Apuração Especial ' + vm.id + ' não encontrada',
                timeout: 4000
              });
              vm.$router.push('/apes')
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

