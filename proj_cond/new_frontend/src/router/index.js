import Vue from 'vue'
import VueRouter from 'vue-router'
import { Notify } from 'quasar'

import routes from './routes'

Vue.use(VueRouter)

/*
 * If not building with SSR mode, you can
 * directly export the Router instantiation
 */

export default function ({ store }/* { store, ssrContext } */) {
  const Router = new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes,

    // Leave these as is and change from quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    mode: process.env.VUE_ROUTER_MODE,
    base: process.env.VUE_ROUTER_BASE
  })

  Router.beforeEach((to, from, next) => {
    console.log('tratando navigation guard')
    store.dispatch('auth/retoken')
      .then(res => {
        if (res) {
          if (to.fullPath === '/') {
            next({ path: '/home' })
          } else {
            verificaPermissaoRota(to, next, store)
            // next()
          }
        } else {
          if (to.fullPath === '/') next()
          else next({ path: '/' })
        }
      })
  })

  return Router
}

function verificaPermissaoRota (to, next, store) {
  if (to.meta.perfis && to.meta.perfis.length > 0) {
    store.dispatch('auth/hasRole', to.meta.perfis)
      .then((res) => {
        console.log('tem perfil?', res)
        if (res) next()
        else {
          Notify.create('O usuário logado não tem acesso a página solicitada')
          next(false)
        }
      })
  } else next()
}
