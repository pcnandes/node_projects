import axios from 'axios'

export default ({ Vue }) => {
  Vue.prototype.$axios = axios
  /*
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://localhost:8983',
    withCredentials: false,
    timeout: 1000,
    responseType: 'json',
    responseEncoding: 'utf8',
    headers: {
      get: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*'
      }
    }
  })
  */
  // http://forum.quasar-framework.org/topic/1838/axios-settings-defaults-0-15/6
  // Vue.prototype.$axios.interceptors.response.use(function (response) {
}
