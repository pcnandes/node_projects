import jwt from 'jsonwebtoken'
import axios from 'axios'

// TODO Lançar erros no lugar de false
export const login = ({dispatch}, data) => {
  // efetuo login
  return axios.post('/public/login', data.credenciais)
    .then((res) => {
      console.log(res.data)
      return dispatch('setToken', res.data)
    })
    .catch((ok, err) => {
      console.log(err)
      return false
    })
}

export const setToken = ({commit, dispatch, state}, encodedToken) => {
  if (encodedToken) {
    // const decoded = jwt.decode(encodedToken)

    try {
      var decoded = jwt.decode(encodedToken, {complete: true})
      console.log(decoded.header)
      console.log(decoded.payload)
      // gravo usuario no localStorage
      localStorage.setItem('SINDCON_TOKEN', JSON.stringify(decoded.payload))
      commit('setUsuario', decoded.payload)
    } catch (err) {
      console.log(err)
    }

    return true
  }
  return false
}
