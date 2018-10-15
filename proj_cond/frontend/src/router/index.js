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
    let logado = store.getters['auth/isLogado']
    if (!logado) {
      store.dispatch('auth/retoken')
        .then(res => {
          console.log('res retoken')
          console.log(res)
          if (res) {
            if (to.fullPath === '/') {
              next({path: '/home'})
            } else next()
          } else {
            let redirect = to.fullPath === '/' ? undefined : to.fullPath
            next({path: redirect})
          }
        })
    } else {
      if (to.fullPath === '/') {
        next({path: '/home'})
      } else next()
    }
  })

  return Router
}
