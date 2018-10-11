export default {
  namespaced: true,
  state: {
    sequence: 0,
    list: []
  },
  getters: {
    list (state) {
      return state.list;
    }
  },
  mutations: {
    add (state, alert) {
      alert.visible = true;
      alert.id = ++state.sequence;
      state.list.push(alert);
    },
    remove (state, id) {
      for (let i = 0; i < state.list.length; i++) {
        if (state.list[i].id === id) {
          state.list.splice(i, 1);
          return;
        }
      }
    },
    clear (state) {
      if (state.list.length > 0) {
        state.list.splice(0, state.list.length);
      }
    }
  },
  actions: {
    add ({commit}, alert) {
      if (alert.timeout) {
        setTimeout(() => {
          alert.visible = false;
        }, alert.timeout);
      }
      commit('add', alert);
    },
    remove ({commit}, id) {
      commit('remove', id);
    },
    clear ({commit}) {
      commit('clear');
    }
  }
}
