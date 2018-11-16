<template>
   <q-page padding class="docs-input row justify-center pagina">
    <div class='full-width' style="max-width: 90vw;" >
      <q-field :count="50" >
        <q-input v-model="condominio.nome" float-label="Nome do Condomínio"/>
      </q-field>
      <br/>
      <div class="row justify-center q-mb-lg">
        <q-btn class="col-xs-12 col-md-auto" label="Adicionar bloco" @click="prepararAdicionarBloco()" color="primary"/>
      </div>
      <div class="row justify-center" v-if="condominio.blocos && condominio.blocos.length>0">
        <q-list class="col-12">
          <q-collapsible icon="business" :label="'Bloco ' + bl.nome"
            v-for="(bl, i) in condominio.blocos" :key="i">
            <div class="row col-12 justify-center">
              <div>
                <div class="row col-10" v-for="(andar, i) in bl.andar" :key="i">
                  <div class="divAndar justify-center">{{andar.andar}}</div>
                  <div class="col-auto divUnidade" v-for="(unidade, y) in andar.unidades" :key="y">
                    {{unidade}}
                  </div>
                </div>
              </div>
            </div>
            <div class="row col-12 justify-center gutter-sm q-mt-xs">
              <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" label="Alterar bloco" @click="prepararAlterarBloco(bl)" color="faded"/></div>
              <div class="row col-xs-12 col-md-auto"><q-btn class="col-xs-12" label="Excluir bloco" @click="prepararExclusaoBloco()" color="negative"/></div>
            </div>
          </q-collapsible>
        </q-list>
      </div>
    </div>
    <adicionar-bloco :exibeModal="exibeModalBloco" @fechar="fecharModal"
      v-model="bloco" @acaoAdicionarBloco="addAltBloco" :modo="modoAdicionarBloco">
    </adicionar-bloco>
   </q-page>
</template>

<script>
import { QBtn, QField, QInput, QModal, QCollapsible } from 'quasar'
import { required } from 'vuelidate/lib/validators'
// import Vue from 'vue'
import { Condominio, Bloco, Andar } from './mixin.js'
import AdicionarBloco from './AdicionarBloco.vue'

export default {
  name: 'CadastroCondominio',
  components: { QBtn, QField, QInput, QModal, QCollapsible, 'adicionar-bloco': AdicionarBloco },
  data () {
    return {
      modoAdicionarBloco: 'INCLUSAO', // 'INCUSAO' 'ALTERACAO'
      exibeModalBloco: false,
      bloco: new Bloco(),
      // areaComum: new AreaComum(),
      // garagem: new Garagem(),
      condominio: new Condominio(),
      andar: new Andar()
    }
  },
  validations: {
    form: {
      condominio: { required },
      usuario: { required },
      senha: { required }
    }
  },
  methods: {
    prepararAdicionarBloco () {
      this.modoAdicionarBloco = 'INCLUSAO'
      this.exibeModalBloco = true
      this.bloco = new Bloco()
    },
    prepararAlterarBloco (bloco) {
      this.modoAdicionarBloco = 'ALTERACAO'
      this.exibeModalBloco = true
      this.bloco = bloco
    },
    addAltBloco (bloco) {
      // se o bloco existe eu adiciono se nao existe nao faço nada pois o obj ja foi alterado pelo componente
      if (bloco) {
        this.condominio.blocos.push(bloco)
      }
    },
    fecharModal () {
      this.exibeModalBloco = false
    }
  }
}
</script>

<style>
  .divUnidade {
    position:relative;
    border: 1px solid #5a5a5a;
    min-width: 60px!important;
    max-width: 88px!important;
    margin-bottom: 5px;
    margin-right: 5px;
    text-align: center;
  }
  .divAndar {
    width: 30px;
    background-color: #5a5a5a;
    margin-bottom: 5px;
    margin-right: 5px;
    text-align: center;
  }
  .botaoExcluirUnidade {
    position:absolute; top:0; right:0;
    margin:0;
  }

  @media (max-width: 575px) {
    .divUnidade {
      margin-bottom: 2px;
      margin-right: 2px;
      min-width: 60px!important;;
      max-width: 70px!important;;
    }
    .divAndar {
      margin-bottom: 2px;
      margin-right: 2px;
    }
  }
</style>
