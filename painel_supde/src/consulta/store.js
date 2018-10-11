import axios from 'axios'
import Vue from 'vue'

export default {
  namespaced: true,
  state: {
    esquemaVO: null,
    esquema: {}
  },
  mutations: {
    list (state, value) {
      state.esquemaVO = value;
    },
    load (state, payload) {
      Vue.set(state.esquema, payload.nome, payload.valor);
    },
    unload (state, nome) {
      Vue.delete(state.esquema, nome);
    },
    clear (state) {
      state.esquemaVO = [];
      state.esquema = {};
    }
  },
  actions: {
    find ({state, commit}, nome) {
      if (state.esquema[nome]) {
        return new Promise((resolve, reject) => {
          resolve(state.esquema[nome]);
        })
      }
      else {
        return axios.get('esquema/' + nome)
          .then(res => {
            // TODO: definir os operadores suportados para cada filtro
            // TODO: definir as comparações suportadas para cada filtro
            commit('load', {nome, valor: res.data});
            return res.data;
          })
      }
    },
    list ({state, commit}) {
      if (state.esquemaVO) {
        return new Promise((resolve, reject) => {
          resolve(state.esquemaVO);
        })
      }
      else {
        return axios.get('esquema')
          .then(res => {
            commit('list', res.data);
            return res.data;
          })
      }
    }
  }
}
