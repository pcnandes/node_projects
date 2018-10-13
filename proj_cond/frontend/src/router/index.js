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
    console.log(store.getters['auth/isLogado'])

    let logado = store.getters['auth/isLogado']
    if (to.path !== '/' && !logado) {
      // tenta fazer o autologin
      store.dispatch('auth/tentarAutologin').then(res => {
        if (res) {
          next()
        } else {
          const query = to.fullPath === '/' ? undefined : {redirect: to.fullPath}
          next({path: '/', query})
        }
      })
      return
    }
    if (to.path === '/' && logado) {
      console.log('next /home')
      next('/home')
      return
    }
    next()
  })

  return Router
}
