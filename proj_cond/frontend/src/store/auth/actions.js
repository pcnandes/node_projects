import jwt from 'jsonwebtoken'
import axios from 'axios'
import { ID_TOKEN } from '../../const'

// TODO
// falta implementar lembrar de mim
export const login = ({dispatch}, data) => {
  return axios.post('/api/public/login', data.credenciais)
    .then((res) => {
      let retorno = dispatch('setToken', res.data.token)
      return retorno
    })
    .catch((err) => {
      throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
    })
}

export const logout = ({commit}) => {
  return commit('apagarToken')
}

export const retoken = ({commit, dispatch, getters}, force) => {
  let expiracao = getters.getExpiracaoToken
  let now = new Date()
  console.log('Executando retoken')
  if (!force && expiracao && expiracao.getTime() > now.getTime()) {
    return true
  } else {
    let token = localStorage.getItem(ID_TOKEN)
    if (token) {
      // cria outra instancia do axios para evitar o axios.defaults.headers['x-access-token']
      const instance = axios.create({
        headers: {
          common: { 'authorization': JSON.parse(token) }
        }
      })
      return instance.post('/api/public/retoken')
        .then(res => {
          return dispatch('setToken', res.data.token)
        })
        .catch(() => {
          commit('apagarToken')
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
    console.log(decodedToken)
    if (decodedToken && decodedToken.exp) {
      const dataExpiracao = new Date(0)
      const now = new Date()
      dataExpiracao.setUTCSeconds(decodedToken.exp)
      // verifica se o token não expirou
      console.log('tempo expiracao', (dataExpiracao.getTime() - now.getTime()) / 1000)
      if (dataExpiracao.getTime() > now.getTime()) {
        // constroi o objeto usuário a partir do token
        const usuario = decodedToken.usuario
        // configura o cabeçalho padrão das requisições HTTP para conter o token
        // axios.defaults.headers['x-access-token'] = encodedToken
        axios.defaults.headers['authorization'] = encodedToken
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
export const hasRole = ({getters}, holes) => {
  // verifico se existe exigencia de perfil
  if (!holes || holes.length === 0) return true
  let perfis = getters.getUsuario.perfis
  // verifico se o usuario possui o perfil
  return holes.some(role => perfis && perfis.some(perfil => perfil === role))
}
