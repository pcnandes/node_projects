import axios from 'axios'

export default ({ Vue }) => {
  // Vue.prototype.$axios = axios
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000
    // headers: {'X-Custom-Header': 'foobar'}
  })

  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    Vue.prototype.$q.loading.show({
      delay: 400, // ms
      message: 'aguarde...'
    })
    return config
  }, function (error) {
    Vue.prototype.$q.loading.hide()
    // Do something with request error
    return Promise.reject(error)
  })

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    Vue.prototype.$q.loading.hide()
    return response
  }, function (error) {
    Vue.prototype.$q.loading.hide()
    Vue.prototype.$q.notify({
      color: 'negative',
      position: 'bottom',
      message: `Erro(${error.response.status}) - ${error.response.data.message}`,
      icon: 'mdi-alert'
    })
    // Do something with response error
    return Promise.reject(error)
  })
}
