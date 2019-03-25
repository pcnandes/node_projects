<template>
  <q-page class="justify-center pagina">
    Pensado para o caso do sindico querer trocar de condominio sem refazer login
    <div class="row q-mb-xl" v-if="condominios.length>0">
      <div class="col-8 q-mr-xs">
        <my-select icon="mdi-domain" ref="condominio" v-model="condominio" :options="condominios"
          option-label="nome" option-value="id" label="Condomínio" required >
        </my-select>
      </div>
      <q-btn icon="mdi-check" color="blue-grey-14" size="20px" @click="selecionar">
        <q-tooltip>
          Selecionar condomínio
        </q-tooltip>
      </q-btn>
    </div>
    <div class="barra-botoes">
      <q-btn icon="mdi-plus" size="18px" label="Cadastrar Condomínio" @click="novo()" color="primary"/>
    </div>
  </q-page>
</template>

<script>
import { axiosInstance } from 'boot/axios'
import MySelect from '../shared/MySelect'

export default {
  name: 'selecionar_condominio',
  components: { 'my-select': MySelect },
  data () {
    return {
      condominios: [],
      condominio: null
    }
  },
  methods: {
    listarCondominios () {
      if (this.possuiPerfil('ADMIN')) {
        axiosInstance.get('/api/condominio')
          .then((res) => {
            this.condominios = res.data
          })
          .catch((err) => {
            console.error('ERRO: ', err.response.erro, err.erro)
          })
      } else if (this.possuiPerfil('ADMIN')) {
        // carregar os condominios
      }
    },
    selecionar (condominio) {
      if (this.$refs.condominio.hasError()) {
        this.alertaErro('Selecione um condomínio')
      }
    },
    novo () {
      this.$router.push('/condominio/novo')
    }
  },
  mounted () {
    this.listarCondominios()
  }
}
</script>
