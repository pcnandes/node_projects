<template>
  <q-page class="justify-center pagina">
      <!-- <q-list v-if="condominios.length>0" highlight class="col-12">
        <q-list-header>Condomínios cadastrados</q-list-header>
        <q-item v-for="c in condominios" :key="c.id" @click.native="detalhar(c)">
          <q-item-side>
            <q-item-tile icon="mdi-domain" color="primary" />
          </q-item-side>
          <q-item-main :label="c.nome" />
        </q-item>
      </q-list>
      <p v-else>Nenhum condomínio cadastrado</p>
      <div class="barra-botoes">
        <q-btn icon="mdi-plus" label="Cadastrar Condomínio" @click="novo()" color="secondary"/>
      </div> -->
      <div class="row q-mb-xl" v-if="condominios.length>0">
      <div class="col-8 q-mr-xs">
        <my-select icon="mdi-domain" ref="condominio" v-model="condominio" :options="condominios"
          option-label="nome" option-value="id" label="Condomínio" required map-options>
        </my-select>
      </div>
      <q-btn icon="mdi-check" color="blue-grey-14" size="20px" @click="detalhar()">
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
      this.$router.push('/condominio/' + this.condominio.id)
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
