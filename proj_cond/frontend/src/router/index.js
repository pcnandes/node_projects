import Vue from 'vue'
import VueRouter from 'vue-router'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({store}/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    console.log('tratando navigation guard')
    // verifica se o usuário está autenticado
    console.log(store.getters['auth/getUsuario'])

    let logado = store.getters['auth/isLogado']
    // if (to.path !== '/' && !logado) {
    if (to.path !== '/' && !logado) {
      // tenta fazer o autologin
      store.dispatch('auth/retoken')
        .then(res => {
          if (res) {
            if (to.fullPath === '/') {
              next({path: '/home'})
            } else next()
          } else next({path: '/'})
        })
        .catch(err => {
          console.log(err)
          next({path: '/'})
          // const query = to.fullPath === '/' ? undefined : {redirect: to.fullPath}
          // next({path: '/', query})
        })
    } else if (logado) {
      if (to.fullPath === '/') {
        next({path: '/home'})
      } else next()
    } else {
      next()
    }
  })

  return Router
}
