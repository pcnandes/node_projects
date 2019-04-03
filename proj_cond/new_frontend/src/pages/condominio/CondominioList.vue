<template>
  <q-page class="justify-center pagina">
    <div class="row q-mb-xl" v-if="condominios.length>0">
      <div class="col-8">
        <my-select icon="mdi-domain" ref="condominio" v-model="condominio" :options="condominios"
          option-label="nome" option-value="id" label="Condomínio" required map-options>
        </my-select>
      </div>
      <q-btn icon="mdi-check" color="positive" size="19px" class="q-mt-xs q-mb-sm" @click="detalhar()">
        <q-tooltip>
          Selecionar condomínio
        </q-tooltip>
      </q-btn>
    </div>
    <div class="barra-botoes">
      <q-btn icon="mdi-plus" size="17px" label="Cadastrar Condomínio" @click="novo()" color="primary"/>
    </div>
  </q-page>
</template>

<script>
import MySelect from '../../shared/MySelect'

export default {
  name: 'Lista_condominio',
  components: { 'my-select': MySelect },
  data () {
    return {
      condominios: [],
      condominio: null
    }
  },
  methods: {
    listarCondominios () {
      this.$axios.get('/api/condominio')
        .then((res) => {
          this.condominios = res.data
          this.condominio = this.condominios[0]
        })
        .catch((err) => {
          console.error('ERRO: ', err.response.erro, err.erro)
          // throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
        })
    },
    detalhar () {
      if (this.$refs.condominio.hasError()) this.alertaErro('Selecione o condominio.')
      else this.$router.push('/condominio/' + this.condominio.id)
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
