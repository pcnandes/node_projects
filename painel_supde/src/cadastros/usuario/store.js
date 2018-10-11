import axios from 'axios'

const USUARIO_API = 'usuario';

export default {
  namespaced: true,
  state: {
    list: []
  },
  mutations: {
    update (state, list) {
      state.list = list;
    }
  },
  actions: {
    list ({state, commit}) {
      if (state.list) {
        return new Promise((resolve, reject) => {
          resolve(state.list);
        })
      }
      else {
        return axios.get(USUARIO_API)
          .then(res => {
            commit('update', res.data);
            return res.data;
          })
      }
    }
  }
}
