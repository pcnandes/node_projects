<template>
  <div class="border border-rounded border-primary column" style="margin:4px;">
    <!-- Barra de Título -->
    <div class="bg-primary text-white row" style="padding:2px; font-size:.9em">
      <span v-if="filtro">{{filtro.titulo}}</span>
      <span class="flex">&nbsp;</span>
      <a @click="removerFiltro()" class="text-white" title="Remover filtro" v-if="!condicao.obrigatorio">
        <i class="fa fa-close" />
      </a>
    </div>
    <!-- Conteúdo -->
    <div style="padding:2px; font-size:.8em" class="flex column">
      <div v-if="loading" align="center">
        <q-spinner size="50px" color="primary"></q-spinner>
      </div>
      <table align="center" style="width:100%; height:100%" v-if="!loading">
        <tbody>
          <!-- Operador -->
          <tr>
            <td align="center" width="1" valign="middle">
              <input type="checkbox" v-model="condicao.negado" title="NOT" v-if="!condicao.obrigatorio">
            </td>
            <td align="center">
              <select v-model="condicao.operador" @change="alterarOperador">
                <option v-for="(e,i) in operadores" :key="i" :value="e.value">{{condicao.negado ? 'não' : ''}} {{e.label}}</option>
              </select>
            </td>
          </tr>
          <!-- MultiSelect / Hierarquia -->
          <tr v-if="(filtro && filtro.hierarquia) || condicao.operador === 'IN'">
            <td colspan="2" align="center">
              <div class="row vertical-middle">
                <a v-if="condicao.operador === 'IN'" title="Selecionar todos" @click="selecionarTudo()"><i class="fa fa-check-circle-o"/></a>
                &nbsp;
                <a v-if="condicao.operador === 'IN'" title="Desmarcar todos" @click="selecionarNada()"><i class="fa fa-ban"/></a>
                <div class="flex" style="display:inline-block; text-align: center; font-size:.8em; line-height:1.4em">
                  &nbsp;
                  <span v-if="condicao.operador === 'IN'">{{condicao.valor.length}} / {{valores.length}}</span>
                  &nbsp;
                </div>
                <a title="Subir de nível" v-if="nivelAtual > 0" @click="subirHierarquia()"><i class="fa fa-arrow-up"/></a>
                &nbsp;
                <a title="Descer de nível" v-if="nivelAtual < nivelMaximo" @click="descerHierarquia()"><i class="fa fa-arrow-down"/></a>
              </div>
            </td>
          </tr>
          <!-- Hierarquia -->
          <tr v-if="condicao.hierarquia && condicao.operador !== 'EXIST' && !condicao.comparar">
            <td colspan="2" align="center">
              <ul style="list-style: none; margin: 0px; padding: 0px; font-size: .8em" title="Hierarquia">
                <li v-for="(valor,index) in condicao.hierarquia" :key="index">
                  {{valor}}
                </li>
              </ul>
            </td>
          </tr>
          <!-- Valor -->
          <tr v-if="condicao.operador !== 'EXIST'">
            <td valign="middle">
              <input type="checkbox" title="Habilitar comparações dinâmicas" v-model="condicao.comparar" v-if="habilitarComparacao" @change="alterarComparacao()">
            </td>
            <td>
              <component ref="input" :is="tipoInput" v-model="condicao.valor" :tipo="filtro.tipo" :valores="opcoes" @detalhar="descerHierarquia()"></component>
            </td>
          </tr>
          <!-- Complemento -->
          <tr v-if="condicao.operador !== 'EXIST'">
            <td valign="middle">
              <input type="checkbox" v-model="complemento" v-if="habilitarComplemento">
            </td>
            <td>
              <complemento v-if="complemento" v-model="condicao.complemento" :tipo="filtro.tipo"></complemento>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import { QTooltip, QSpinner } from 'quasar'
import { OPERADOR } from '../../const.js'
import axios from 'axios'

import InputSimple from './InputSimple.vue'
import InputBetween from './InputBetween.vue'
import InputSelectMulti from './InputSelectMulti.vue'
import InputSelectSingle from './InputSelectSingle.vue'
import InputComparacao from './InputComparacao.vue'
import Complemento from './Complemento.vue'

export default {
  components: {
    QTooltip, QSpinner,
    InputSimple, InputBetween, InputSelectMulti, InputSelectSingle, InputComparacao, Complemento
  },
  props: {
    condicao: null,
    filtros: null
  },
  data () {
    return {
      loading: false,
      descritor: null,
      valores: [],
      comparacoes: [],
      operadores: [],
      atributosHierarquia: [],
      complemento: false
    }
  },
  computed: {
    /**
     * Retorna a lista de opções selecionáveis (para o caso de comparações ou valores pré-definidos ou dinâmicos)
     */
    opcoes () {
      if (this.condicao.comparar) {
        return this.comparacoes;
      }
      else {
        return this.valores;
      }
    },
    /**
     * Indica o nível hierárquico atual
     */
    nivelAtual () {
      return this.condicao.hierarquia ? this.condicao.hierarquia.length : 0;
    },
    /**
     * Indica o nível máximo que pode descer na hierarquia
     */
    nivelMaximo () {
      if (this.atributosHierarquia.length > 0 && this.hasRole('URC')) {
        const atributoMaximo = this.atributosHierarquia[this.atributosHierarquia.length - 1];
        if (atributoMaximo.restricao === 'EMPREGADO') {
          return this.atributosHierarquia.length - 2;
        }
      }
      return this.atributosHierarquia.length - 1;
    },
    /**
     * Obtém o descritor do filtro
     */
    filtro () {
      if (!this.descritor) {
        if (this.filtros) {
          this.descritor = this.filtros.filter(x => x.nome === this.condicao.filtro)
          if (this.descritor.length > 0) {
            this.descritor = this.descritor[0];
          }
          else {
            this.descritor = null;
          }
        }
      }
      return this.descritor;
    },
    /**
     * Indica o nome do componente a ser usado para preencher o valor
     */
    tipoInput () {
      if (this.condicao.comparar) {
        return 'InputComparacao';
      }
      else if (this.condicao.operador === 'IN') {
        return 'InputSelectMulti';
      }
      else if (this.condicao.operador === 'EQUALS' && (this.filtro.dinamico || this.filtro.hierarquia || this.valores.length > 0)) {
        return 'InputSelectSingle';
      }
      else if (this.condicao.operador === 'BETWEEN') {
        return 'InputBetween';
      }
      return 'InputSimple';
    },
    /**
     * Indica se comparações estáo disponíveis
     */
    habilitarComparacao () {
      return this.comparacoes && this.comparacoes.length > 0 && ['EQUALS', 'GREATER', 'LOWER'].indexOf(this.condicao.operador) >= 0;
    },
    /**
     * Indica se o complemento está disponível
     */
    habilitarComplemento () {
      return this.condicao.comparar && ['BETWEEN', 'IN', 'EXIST'].indexOf(this.condicao.operador) < 0 && this.habilitarComparacao && ['DATE', 'TIMESTAMP', 'DOUBLE', 'PERCENT', 'INTEGER'].indexOf(this.filtro.tipo) >= 0
    }
  },
  methods: {
    /**
     * Notifica que o filtro foi removido (cabe a condição pai removê-lo)
     */
    removerFiltro () {
      this.$emit('removed', this.condicao);
    },
    /**
     * Método chamado ao trocar operador
     */
    alterarOperador () {
      if (this.condicao.operador === 'EXIST') {
        this.condicao.valor = [];
        this.condicao.comparar = false;
        this.condicao.complemento = null;
        this.complemento = false;
      }
      if (['IN', 'BETWEEN'].indexOf(this.condicao.operador) >= 0) {
        this.condicao.comparar = false;
        this.condicao.complemento = null;
        this.complemento = false;
      }
      if (['IN', 'EQUALS'].indexOf(this.condicao.operador) >= 0 && (this.filtro.dinamico || this.filtro.hierarquia || this.filtro.valores)) {
        if ((!this.valores || this.valores.length === 0)) {
          this.buscarValoresDinamicos();
          return;
        }
      }
      if (this.condicao.comparar || (this.valores && this.valores.length > 0)) {
        this.selecaoAutomatica();
      }
    },
    /**
     * Busca valores dinâmicos do filtro
     */
    buscarValoresDinamicos () {
      this.loading = true;
      const vm = this;
      axios.post('query/' + this.filtro.origem + '/' + this.filtro.nome, this.condicao.hierarquia || [])
        .then(res => {
          if ((!res.data || res.data.length === 0) && this.filtro.hierarquia) {
            vm.subirHierarquia();
          }
          else {
            vm.valores = res.data;
          }
          vm.selecaoAutomatica();
          vm.loading = false;
        })
        .catch(res => {
          if (this.filtro.hierarquia) {
            vm.subirHierarquia();
          }
          vm.loading = false;
        });
    },
    /**
     *
     */
    subirHierarquia () {
      if (this.filtro.hierarquia && this.condicao.hierarquia.length > 0) {
        this.condicao.hierarquia.splice(this.condicao.hierarquia.length - 1, 1);
        this.buscarValoresDinamicos();
      }
    },
    /**
     *
     */
    descerHierarquia () {
      if (this.filtro.hierarquia) {
        if (this.condicao.valor.length === 0) {
          return;
        }
        if (this.condicao.valor.length > 1) {
          return;
        }
        if (this.condicao.hierarquia.length >= (this.atributosHierarquia.length - 1)) {
          return;
        }
        // TODO: verificar se já está no nível máximo da hierarquia
        this.condicao.hierarquia.push(this.condicao.valor[0]);
        this.condicao.valor.splice(0, this.condicao.valor.length);
        this.buscarValoresDinamicos();
      }
    },
    /**
     * Seleciona todos os valores
     */
    selecionarTudo () {
      this.condicao.valor = this.valores.slice(0);
    },
    /**
     * Seleciona nenhum valor
     */
    selecionarNada () {
      this.condicao.valor = [];
    },
    /**
     * Realiza seleção automática dos valores dependendo do operador, restrição de acesso, perfis, ...
     */
    selecaoAutomatica () {
      const valores = this.condicao.comparar ? this.comparacoes.map(x => x.value) : this.valores;
      // remove os valores que não existem na listagem
      for (let i = 0; i < this.condicao.valor.length; i++) {
        if (valores.indexOf(this.condicao.valor[i]) < 0) {
          this.condicao.valor.splice(i--, 1);
        }
      }
      // se não estiver escolhido nenhum valor então seleciona todos
      if (this.condicao.valor.length === 0 && valores.length > 0) {
        if (this.condicao.operador === 'IN') {
          this.condicao.valor = valores.slice(0);
        }
        else {
          this.condicao.valor = [valores[0]];
        }
      }
    },
    /**
     * Evento quando alterna o checkbox de comparação
     */
    alterarComparacao () {
      this.condicao.valor = [];
      this.complemento = false;
      this.alterarOperador();
    }
  },
  created () {
    // inicializa operadores
    let operadoresValidos = this.filtro.operadores;
    if (!operadoresValidos || operadoresValidos.length === 0) {
      operadoresValidos = [];
      operadoresValidos.push('EXIST');
      operadoresValidos.push('EQUALS');
      if (['DATE', 'TIMESTAMP', 'PERCENT', 'DOUBLE', 'INTEGER'].indexOf(this.filtro.tipo) >= 0) {
        operadoresValidos.push('BETWEEN');
        operadoresValidos.push('GREATER');
        operadoresValidos.push('LOWER');
      }
      if (this.filtro.dinamico || this.filtro.hierarquia || (this.filtro.valores && this.filtro.valores.length > 0)) {
        operadoresValidos.push('IN');
        if (!this.condicao.operador) {
          this.$set(this.condicao, 'operador', 'IN');
        }
      }
      else if (this.filtro.tipo === 'STRING') {
        operadoresValidos.push('LIKE');
        operadoresValidos.push('CONTAINS');
        operadoresValidos.push('START');
        operadoresValidos.push('END');
      }
    }
    // cria uma lista de label/value para usar no select de operadores
    for (let i = 0; i < operadoresValidos.length; i++) {
      if (!this.condicao.obrigatorio || operadoresValidos[i] !== 'EXIST') {
        this.operadores.push({value: operadoresValidos[i], label: OPERADOR[operadoresValidos[i]]});
      }
    }
    // define os valores padrão para o filtro
    if (!this.condicao.operador) {
      if (this.filtro.padrao) {
        for (let field in this.filtro.padrao) {
          this.$set(this.condicao, field, JSON.parse(JSON.stringify(this.filtro.padrao[field])));
        }
      }
      else {
        if (['DATE', 'TIMESTAMP'].indexOf(this.filtro.tipo) >= 0) {
          this.$set(this.condicao, 'operador', 'BETWEEN');
        }
        else if (['INTEGER', 'DOUBLE', 'PERCENT'].indexOf(this.filtro.tipo) >= 0) {
          this.$set(this.condicao, 'operador', 'GREATER');
        }
        else {
          this.$set(this.condicao, 'operador', 'EQUALS');
        }
      }
    }
    this.valores = this.filtro.valores || [];
    if (!this.condicao.valor) {
      this.$set(this.condicao, 'valor', []);
    }
    if (!this.condicao.hierarquia) {
      this.$set(this.condicao, 'hierarquia', []);
    }
    if (!this.condicao.comparar) {
      this.$set(this.condicao, 'comparar', false);
    }
    if (!this.condicao.complemento) {
      this.$set(this.condicao, 'complemento', null);
    }

    if (this.filtro.restricao && this.filtro.restricao !== 'URC' && !this.loggedUser.externo && this.condicao.hierarquia.length === 0) {
      if (this.hasRole('ADMINISTRADOR')) {
        this.condicao.hierarquia = [];
      }
      else if (this.hasRole('SUPERINTENDENCIA', 'APOIO_SUPERINTENDENCIA', 'GERENTE', 'APOIO_GERENTE') || ['DEGDS', 'DEGDE'].indexOf(this.loggedUser.departamento) >= 0) {
        this.condicao.hierarquia = [this.loggedUser.ug];
      }
      else if (this.hasRole('CHEFIA', 'APOIO_CHEFIA')) {
        this.condicao.hierarquia = [this.loggedUser.ug, this.loggedUser.departamento];
      }
      else {
        this.condicao.hierarquia = [this.loggedUser.ug, this.loggedUser.departamento, this.loggedUser.divisao];
      }
    }
    // inicializa comparações
    if (this.filtro.origem) {
      const vm = this;
      this.$store.dispatch('esquema/find', this.filtro.origem)
        .then(esquema => {
          if (vm.filtro.hierarquia) {
            const hierarquia = esquema.hierarquias.find(x => x.nome === vm.filtro.hierarquia);
            if (hierarquia) {
              for (let i = 0; i < hierarquia.atributos.length; i++) {
                const atributo = esquema.atributos.find(x => x.nome === hierarquia.atributos[i]);
                if (atributo) {
                  vm.atributosHierarquia.push(atributo);
                }
              }
            }
          }
          if (vm.filtro.comparacoes) {
            for (let i = 0; i < vm.filtro.comparacoes.length; i++) {
              const other = esquema.filtros.filter(x => x.nome === vm.filtro.comparacoes[i]);
              if (other && other.length > 0) {
                vm.comparacoes.push({
                  order: 1,
                  label: other[0].titulo,
                  value: other[0].nome
                });
              }
            }
            // ordena pelo label (mantendo os valores relativos primeiro)
            vm.comparacoes.sort((a, b) => {
              if (a.order === b.order) {
                if (a.label < b.label) {
                  return -1;
                }
                if (a.label > b.label) {
                  return 1;
                }
                return 0;
              }
              return b.order - a.order;
            });
          }
        })
    }
    if (['DATE', 'TIMESTAMP'].indexOf(this.filtro.tipo) >= 0) {
      this.comparacoes.push({value: '@today', label: '(Hoje)', order: 2});
      this.comparacoes.push({value: '@week', label: '(Esta semana)', order: 3});
      this.comparacoes.push({value: '@month', label: '(Este mês)', order: 4});
      this.comparacoes.push({value: '@year', label: '(Este ano)', order: 5});
    }
    // comparações baseadas no perfil
    if (this.filtro.restricao) {
      this.comparacoes.push({value: '@user', label: '(Tudo que o Usuário pode ver)', order: 2});
      if (this.filtro.restricao !== 'URC') {
        this.comparacoes.push({value: '@user.ug', label: '(UG do Usuário)', order: 3});
        this.comparacoes.push({value: '@user.depto', label: '(Departamento do Usuário)', order: 4});
        this.comparacoes.push({value: '@user.divisao', label: '(Divisão do Usuário)', order: 5});
      }
    }
    this.alterarOperador();
  }
}
</script>

<style scoped>
</style>