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
    store.dispatch('auth/retoken')
      .then(res => {
        if (res) {
          if (to.fullPath === '/') {
            next({path: '/home'})
          } else {
            verificaPermissaoRota(to, next, store)
            // next()
          }
        } else {
          if (to.fullPath === '/') next()
          else next({to: '/', replace: true})
          // let redirect = to.fullPath === '/' ? undefined : '/'
          // next({path: redirect})
        }
      })
  })

  return Router
}

function verificaPermissaoRota (to, next, store) {
  console.log('verificaPermissaoRota', to)
  if (to.meta.perfis && to.meta.perfis.length > 0) {
    store.dispatch('auth/hasRole', to.meta.perfis)
      .then((res) => {
        if (res) next()
        else {
          // this.$q.notify('Usuário logado nao tem acesso ao cadastro de condominio')
          console.log('SEM ACESSO A PAGINA')
          next(false)
        }
      })
  } else next()
}
