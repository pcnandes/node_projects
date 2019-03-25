<template>
  <q-page class="justify-center pagina">
    <botoes-crud @cancelar="cancelar()" :exibeExcluir="false" labelConfirmar="Salvar" @confirmar="salvar()"
      :titulo="usuario.nome" />
    <div class="row formulario">
      <q-field class="col-12" icon="mdi-account">
        <q-input v-model="usuario.nome" float-label="Nome"
          @blur="$v.usuario.nome.$touch" :error="$v.usuario.nome.$error"/>
      </q-field>
      <q-field class="col-md-4 col-xs-12" icon="mdi-calendar">
        <q-datetime v-model="usuario.nascimento" type="date" float-label="Nascimento"
          min="1900-12-31" :max="Date.now()" default-view="year" clearable/>
      </q-field>
      <q-field class="col-md-8 col-xs-12" icon="mdi-email">
        <q-input v-model="usuario.email" type="email" float-label="email"
          @blur="$v.usuario.email.$touch" :error="$v.usuario.email.$error"/>
      </q-field>
      <q-field class="col-md-4 col-xs-12" icon="mdi-phone">
        <q-input v-model="usuario.telefone" type="tel" float-label="Telefone"
          v-mask="'(##) ####-####'" placeholder="(99) 9999-9999"
          @blur="$v.usuario.telefone.$touch" :error="$v.usuario.telefone.$error"/>
      </q-field>
      <q-field class="col-md-4 col-xs-12" icon="mdi-cellphone">
        <q-input v-model="usuario.celular1" type="tel" float-label="Celular 1"
          v-mask="'(##) #####-####'" placeholder="(99) 99999-9999"
          @blur="$v.usuario.celular1.$touch" :error="$v.usuario.celular1.$error"/>
      </q-field>
      <q-field class="col-md-4 col-xs-12" icon="mdi-cellphone">
        <q-input type="tel" float-label="Celular 2" v-model="usuario.celular2"
          v-mask="'(##) #####-####'" placeholder="(99) 99999-9999"
          @blur="$v.usuario.celular2.$touch" :error="$v.usuario.celular2.$error"/>
      </q-field>
    </div>
    login, perfis, cpf obrigatorio caso sindico ou funcionario (Funcionario)
    <!-- botoes -->
    <div class="barra-botoes">
      <q-btn label="Alterar Senha" color="secondary"/>
    </div>
  </q-page>
<!--
  <q-page>
    Cadastro de usuários (moradores (será no cadatro do condominio), sindico, auxiliar sindico, porteiros)
    <ul>
      <li>Criar pré-cadatro de moradores</li>
      <li>definir bloco e apartamento</li>
      <li>Cadastrar morador (nome, sexo, idade, email e celular)</li>
      <li>Cadastrar pessoas autorizadas</li>
      <li>Definir senha padrao ou gerar senha aleatoria enviar senha</li>
      <li>zerar senha</li>
    </ul>
  </q-page> -->
</template>

<script>
import { QBtn, QField, QInput, QSelect, QDatetime } from 'quasar'
import { required, email, helpers } from 'vuelidate/lib/validators'
import { mask } from 'vue-the-mask'
import axios from 'axios'
import BotoesCrud from '../shared/BotoesCrud'

const telefone = helpers.regex('alpha', /^\([1-9]{2}\) [2-9][0-9]{3,4}-[0-9]{4}$/)

export default {
  name: 'CadastroMorador',
  components: { QBtn, QField, QInput, QSelect, QDatetime, 'botoes-crud': BotoesCrud },
  directives: {mask},
  data () {
    return {
      usuario: {}
    }
  },
  validations: {
    usuario: {
      nome: { required },
      email: {email},
      telefone: {telefone},
      celular1: {telefone},
      celular2: {telefone}
    }
  },
  methods: {
    carregarPagina () {
      // se for MORADOR será direcionado para o cadastro de unidade
    },
    salvar () {
      this.$v.usuario.$touch()
      if (this.$v.usuario.email.$invalid) {
        this.$q.notify('Informe um email vádido!')
      }
      if (this.$v.usuario.$error) {
        this.$q.notify('Preencha as informações do obrigatórias e clique em confirmar.')
      } else {
        if (!this.usuario.id) {
          axios.post('/api/usuario', this.condominio)
            .then((res) => {
              this.condominio = res.data
              this.condominioId = res.data.id
              this.$router.push({ path: `/condominio/${this.condominioId}` })
              this.carregarPagina()
            })
            .catch((err) => {
              console.error('ERRO: ', err.response.erro)
              // throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
            })
        } else {
          axios.put(`/api/condominio/${this.condominio.id}`, this.condominio)
            .then((res) => {
              this.condominio = res.data
              this.alertaSucesso('Condomínio salvo com sucesso')
            })
            .catch((err) => {
              console.error('ERRO: ', err.response.erro)
              // throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
            })
        }
      }
    }
  }
}
</script>

<style scoped>
</style>
