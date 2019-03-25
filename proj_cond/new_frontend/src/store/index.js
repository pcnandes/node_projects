import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

// import example from './module-example'
import auth from './auth'

Vue.use(Vuex)

const vuexLocal = new VuexPersistence({
  storage: window.localStorage
  /* reducer: (state) => ([
    state.auth.condominioLogin,
    state.auth.blocoLogin
  ]) */
  /* reducer: (state) => ([
    { condominioLogin: state.auth.condominioLogin },
    { blocoLogin: state.auth.blocoLogin }
  ]) */
})

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export default function (/* { ssrContext } */) {
  const Store = new Vuex.Store({
    modules: {
      auth
      // example
    },
    plugins: [vuexLocal.plugin]
  })

  return Store
}
