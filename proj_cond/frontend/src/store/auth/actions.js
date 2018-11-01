import jwt from 'jsonwebtoken'
import axios from 'axios'
import { ID_TOKEN } from '../../const'

// TODO
// falta implementar lembrar de mim
export const login = ({dispatch}, data) => {
  // efetuo login
  return axios.post('/public/login', data.credenciais)
    .then((res) => {
      let retorno = dispatch('setToken', res.data.token)
      console.log('retorno login', retorno)
      return retorno
    })
    .catch((err) => {
      throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
    })
}

export const logout = ({commit}) => {
  commit('apagarToken')
}

export const retoken = ({commit, dispatch, getters}, force) => {
  // let usuario = getters.getUsuario
  // console.log(usuario)
  let expiracao = getters.getExpiracaoToken
  let now = new Date()
  console.log(expiracao)
  if (!force && expiracao && expiracao.getTime() > now.getTime()) {
    return true
  } else {
    let token = localStorage.getItem(ID_TOKEN)
    if (token) {
      // cria outra instancia do axios para evitar o axios.defaults.headers['x-access-token']
      const instance = axios.create({
        headers: {
          common: { 'x-access-token': JSON.parse(token) }
        }
      })
      return instance.post('/public/retoken')
        .then(res => {
          return dispatch('setToken', res.data.token)
        })
        .catch(() => {
          commit('clearToken')
          return false
        })
    }
  }
  return false
}

export const setToken = ({commit, dispatch, state}, encodedToken) => {
  console.log('entrou setToken')
  try {
    let decodedToken = jwt.decode(encodedToken)
    if (decodedToken && decodedToken.exp) {
      const dataExpiracao = new Date(0)
      const now = new Date()
      dataExpiracao.setUTCSeconds(decodedToken.exp)
      // verifica se o token não expirou
      if (dataExpiracao.getTime() > now.getTime()) {
        // constroi o objeto usuário a partir do token
        const usuario = decodedToken.usuarioLogado
        // configura o cabeçalho padrão das requisições HTTP para conter o token
        axios.defaults.headers['x-access-token'] = encodedToken
        // cria um timer para atualização do token automaticamente
        state.timerToken = setTimeout(() => {
          console.log('Executando timer retoken')
          dispatch('retoken', true)
        }, Math.max(dataExpiracao.getTime() - now.getTime() - (1000 * 60), 1)) // (1000 * 60) = 1 minuto

        // gravo usuario no localStorage
        localStorage.setItem(ID_TOKEN, JSON.stringify(encodedToken))
        commit('setUsuario', usuario)
        commit('setExpiracaoToken', dataExpiracao)
      }
    }
    return true
  } catch (err) {
    console.log(err)
    return false
  }
}
