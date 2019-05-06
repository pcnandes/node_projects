import axios from 'axios'

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000/',
  // aguarda até 15 segundos
  timeout: 15000
})

export default async ({ Vue, router }) => {
  Vue.prototype.$axios = axiosInstance
  // Add a request interceptor
  Vue.prototype.$axios.interceptors.request.use(function (config) {
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
  Vue.prototype.$axios.interceptors.response.use(function (response) {
    // Do something with response data
    Vue.prototype.$q.loading.hide()
    return response
  }, function (error) {
    Vue.prototype.$q.loading.hide()
    // Gateway Timeout -> servidor offline
    if (error.response.status && error.response.status === 504) {
      disparaMensagemErro(Vue.prototype, `Erro(${error.response.status}) - Servidor offline`)
      router.push('/')
    } else if (error.response.status && error.response.status === 401 &&
        router.currentRoute.path !== '/') {
      disparaMensagemErro(Vue.prototype, `Erro(${error.response.status}) - Login expirado, faça login novamente`)
      router.push('/')
    } else if (error.response.status && error.response.status === 403) {
      disparaMensagemErro(Vue.prototype, `Erro(${error.response.status}) - ${error.response.data.message}`)
      router.go(-1)
    } else if (error.response.status) {
      disparaMensagemErro(Vue.prototype, `Erro(${error.response.status}) - ${error.response.data.message}`)
    }
    // Do something with response error
    return Promise.reject(error)
  })
}

export { axiosInstance }

function disparaMensagemErro (vue, mensagem) {
  vue.$q.notify({
    color: 'negative',
    position: 'bottom',
    message: mensagem,
    icon: 'mdi-alert'
  })
}
