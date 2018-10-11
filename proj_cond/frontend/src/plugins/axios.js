import axios from 'axios'

export default ({ Vue }) => {
  // Vue.prototype.$axios = axios
  Vue.prototype.$axios = axios.create({
    baseURL: 'http://localhost:3000/',
    timeout: 1000
    // headers: {'X-Custom-Header': 'foobar'}
  })
}
