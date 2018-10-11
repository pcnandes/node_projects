import Vue from 'vue'
import VueRouter from 'vue-router'
import usuario from './cadastros/usuario/router'
import apes from './cadastros/apuracao_especial/router';
import depara from './cadastros/depara/router';
import store from './store'

Vue.use(VueRouter)

const router = new VueRouter({
  /*
   * NOTE! VueRouter "history" mode DOESN'T works for Cordova builds,
   * it is only to be used only for websites.
   *
   * If you decide to go with "history" mode, please also open /config/index.js
   * and set "build.publicPath" to something other than an empty string.
   * Example: '/' instead of current ''
   *
   * If switching back to default "hash" mode, don't forget to set the
   * build publicPath back to '' so Cordova builds work again.
   */

  mode: 'history',
  scrollBehavior: () => ({ y: 0 }),

  routes: [
    { path: '', component: () => import(`src/Home.vue`) },
    { path: '/login', component: () => import(`src/auth/Login.vue`) },
    { path: '/usuario', component: () => import(`src/cadastros/usuario/Usuario.vue`), children: usuario },
    { path: '/apes', component: () => import(`src/cadastros/apuracao_especial/Apes.vue`), children: apes },
    { path: '/depara', component: () => import(`src/cadastros/depara/DePara.vue`), children: depara },
    { path: '/consulta/:nome', component: () => import(`src/consulta/simples/Consulta.vue`) },
    // Always leave this last one
    { path: '*', component: () => import(`src/Error404.vue`) } // Not found
  ]
});

router.beforeEach((to, from, next) => {
  // zera o título e subtítulo da aplicação quando muda de rota
  store.state.titulo = store.state.subtitulo = '';
  // verifica se o usuário está autenticado
  let authenticated = store.getters['auth/isAuthenticated'];
  if (to.path !== '/login' && !authenticated) {
    // tenta fazer o autologin
    store.dispatch('auth/tryAutoLogin').then(res => {
      if (res) {
        next();
      }
      else {
        const query = to.fullPath === '/' ? undefined : {redirect: to.fullPath};
        next({path: '/login', query});
      }
    })
    return;
  }
  if (to.path === '/login' && authenticated) {
    console.log('next /');
    next('/');
    return;
  }
  next();
});

export default router;
