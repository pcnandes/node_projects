import jwt from 'jsonwebtoken'
import axios from 'axios'
import { ID_TOKEN } from '../../const'

// TODO
// Lançar erros no lugar de false
// falta implementar lembrar de mim
// falta testar logout, autoLogin e retoken
// falta testar se o cabelçalho automatico esta funcionando axios.defaults.headers
export const login = ({dispatch}, data) => {
  // efetuo login
  return axios.post('/public/login', data.credenciais)
    .then((res) => {
      console.log(res.data)
      return dispatch('setToken', res.data.token)
    })
    .catch(err => {
      console.log(err)
      return false
    })
}

export const logout = ({commit}, data) => {
  commit('apagarToken')
}

// TODO falta criar retoken
export const retoken = ({commit, dispatch}) => {
  console.log('iniciado retoken')
  console.log(axios)

  const instance = axios.create({
    headers: {
      common: {
        'x-access-token': JSON.parse(localStorage.getItem(ID_TOKEN))
      }
    }
  })

  return instance.post('/public/retoken')
    .then(res => {
      return dispatch('setToken', res.data.token)
    })
    .catch(res => {
      // commit('clearToken')
    })
}

export const setToken = ({commit, dispatch, state}, encodedToken) => {
  console.log('entrou setToken')
  if (encodedToken) {
    // const decoded = jwt.decode(encodedToken)
    try {
      var decodedToken = jwt.decode(encodedToken)
      if (decodedToken && decodedToken.exp) {
        const dataExpiracao = new Date(0)
        const now = new Date()
        dataExpiracao.setUTCSeconds(decodedToken.exp)
        // verifica se o token não expirou
        console.log('decodedToken')
        console.log(decodedToken)
        if (dataExpiracao.getTime() > now.getTime()) {
          // constroi o objeto usuário a partir do token
          const usuario = {
            login: decodedToken.usuario,
            nome: decodedToken.nome,
            roles: decodedToken.roles
          }

          // configura o cabeçalho padrão das requisições HTTP para conter o token
          axios.defaults.headers['x-access-token'] = encodedToken
          // cria um timer para atualização do token automaticamente
          state.timerToken = setTimeout(() => {
            dispatch('retoken')
          }, Math.max(dataExpiracao.getTime() - now.getTime() - 2000, 1))

          // gravo usuario no localStorage
          localStorage.setItem(ID_TOKEN, JSON.stringify(encodedToken))
          commit('setUsuario', usuario)
          commit('setLogado', true)
        }
      }
    } catch (err) {
      console.log(err)
      return false
    }
    return true
  }
  return false
}
