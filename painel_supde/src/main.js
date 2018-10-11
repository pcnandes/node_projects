// === DEFAULT / CUSTOM STYLE ===
// WARNING! always comment out ONE of the two require() calls below.
// 1. use next line to activate CUSTOM STYLE (./src/themes)
// require(`./themes/app.${__THEME}.styl`)
// 2. or, use next line to activate DEFAULT QUASAR STYLE
require(`quasar/dist/quasar.${__THEME}.css`)
// ==============================

// Uncomment the following lines if you need IE11/Edge support
// require(`quasar/dist/quasar.ie`)
// require(`quasar/dist/quasar.ie.${__THEME}.css`)

import Vue from 'vue'
import Vuelidate from 'vuelidate'
import Quasar from 'quasar'
import axios from 'axios'

import auth from './auth/mixin'
import store from './store'
import router from './router'

Vue.config.productionTip = false

// configura a URL base dependendo do ambiente (desenvolvimento ou produção)
axios.defaults.baseURL = process.env.API;

Vue.use(Quasar)
Vue.use(Vuelidate)

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-material.css';

if (__THEME === 'mat') {
  require('quasar-extras/roboto-font')
}
import 'quasar-extras/material-icons'
import 'quasar-extras/fontawesome'
import 'quasar-extras/animate'
import 'font-awesome-animation/dist/font-awesome-animation.css'

export const EventBus = new Vue();

axios.defaults.headers.post['Content-Type'] = 'application/json';
// intercepta respostas HTTP para tratamento dos erros
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  let message = null;
  if (!error.response) {
    console.log(error);
    message = 'Servidor Offline';
  }
  else {
    if (Array.isArray(error.response.data) && error.response.data.length > 0) {
      message = error.response.data[0].error_description[0];
    }
  }
  store.dispatch('alert/add', {
    icon: 'fa-warning',
    color: 'negative',
    message,
    timeout: 4000
  });
  return Promise.reject(error);
});

Vue.mixin(auth)

Quasar.start(() => {
  new Vue({
    el: '#q-app',
    store,
    router,
    render: h => h(require('./App').default)
  })
})
