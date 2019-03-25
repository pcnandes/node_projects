import axios from 'axios'

export default ({ Vue }) => {
  let _vue = Vue.prototype
  // Vue.prototype.$axios = axios
  _vue.$axios = axios.create({
    baseURL: 'http://localhost:3000/',
    // aguarda até 15 segundos
    timeout: 15000
    // headers: {'X-Custom-Header': 'foobar'}
  })

  // Add a request interceptor
  axios.interceptors.request.use(function (config) {
    // Do something before request is sent
    _vue.$q.loading.show({
      delay: 400, // ms
      message: 'aguarde...'
    })
    return config
  }, function (error) {
    _vue.$q.loading.hide()
    // Do something with request error
    return Promise.reject(error)
  })

  // Add a response interceptor
  axios.interceptors.response.use(function (response) {
    // Do something with response data
    _vue.$q.loading.hide()
    return response
  }, function (error) {
    _vue.$q.loading.hide()
    console.log('errroooooo', error)
    // Gateway Timeout -> servidor offline
    if (error.response.status && error.response.status === 504) {
      disparaMensagemErro(_vue, `Erro(${error.response.status}) - Servidor offline`)
      _vue.$router.push('/')
    } else if (error.response.status && error.response.status === 401) {
      disparaMensagemErro(_vue, `Erro(${error.response.status}) - Login expirado, faça login novamente`)
      _vue.$router.push('/')
    } else if (error.response.status && error.response.status === 403) {
      disparaMensagemErro(_vue, `Erro(${error.response.status}) - ${error.response.data.message}`)
      _vue.$router.go(-1)
    } else if (error.response.status) {
      disparaMensagemErro(_vue, `Erro(${error.response.status}) - ${error.response.data.message}`)
    }
    // Do something with response error
    return Promise.reject(error)
  })
}

function disparaMensagemErro (vue, mensagem) {
  vue.$q.notify({
    color: 'negative',
    position: 'bottom',
    message: mensagem,
    icon: 'mdi-alert'
  })
}
