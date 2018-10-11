import Vue from 'vue'
import Vuex from 'vuex'

import auth from './auth/store'
import alert from './alert/store'
import usuario from './cadastros/usuario/store'
import esquema from './consulta/store'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    titulo: '',
    subtitulo: ''
  },
  getters: {
    titulo (state) {
      return state.titulo
    },
    subtitulo (state) {
      return state.subtitulo
    }
  },
  mutations: {
    setTitulo (state, payload) {
      if ((typeof payload === 'string') || (payload instanceof String)) {
        state.titulo = payload;
        state.subtitulo = null;
      }
      else {
        state.titulo = payload.titulo
        state.subtitulo = payload.subtitulo
      }
    }
  },
  modules: {
    auth,
    alert,
    usuario,
    esquema
  }
})
