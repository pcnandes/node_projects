import jwt from 'jsonwebtoken'
import { axiosInstance } from 'boot/axios'
import { ID_TOKEN } from '../../const'

export const login = ({ commit, dispatch }, data) => {
  let credenciais = JSON.parse(JSON.stringify(data.credenciais))
  // TODO estou fazendo essa gambi pq o emitValue do componente nao funciona
  if (credenciais.condominio) credenciais.condominio = credenciais.condominio.id
  if (credenciais.bloco) credenciais.bloco = credenciais.bloco.id
  return axiosInstance.post('/api/public/login', credenciais)
    .then((res) => {
      let retorno = dispatch('setToken', res.data.token)
      commit('setCondominioLogin', data.credenciais.condominio)
      commit('setBlocoLogin', data.credenciais.bloco)
      return retorno
    })
    .catch((err) => {
      throw err
      // throw new Error(`Erro(${err.response.status}) -  ${err.response.data.message}`)
    })
}

export const logout = ({ commit }) => {
  return commit('apagarToken')
}

export const retoken = ({ commit, dispatch, getters }, force) => {
  let expiracao = getters.getExpiracaoToken
  let now = new Date()
  console.log('Executando retoken')
  if (!force && expiracao && expiracao.getTime() > now.getTime()) {
    return true
  } else {
    let token = localStorage.getItem(ID_TOKEN)
    if (token) {
      // defino o default authorization
      axiosInstance.defaults.headers.common['authorization'] = JSON.parse(token)
      return axiosInstance.post('/api/public/retoken')
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

export const setToken = ({ commit, dispatch, state, getters }, encodedToken) => {
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
        // axiosInstance.defaults.headers['authorization'] = encodedToken
        axiosInstance.defaults.headers.common['authorization'] = encodedToken
        // cria um timer para atualização do token automaticamente
        state.timerToken = setTimeout(() => {
          // console.log('Executando timer retoken')
          dispatch('retoken', true)
        }, Math.max(dataExpiracao.getTime() - now.getTime() - (1000 * 60), 1)) // (1000 * 60) = 1 minuto

        // gravo usuario no localStorage
        localStorage.setItem(ID_TOKEN, JSON.stringify(encodedToken))
        commit('setUsuario', usuario)
        commit('setExpiracaoToken', dataExpiracao)

        /*
        // confirmar que usuário logado possui condominio e bloco informados no login
        // usuario nao é ADMIN e nao possui unidade ou bloco
        if ((!getters['isPossuiPerfil'](['ADMIN']) && (!usuario.unidade || !usuario.unidade.bloco || !this.getBlocoLogin)) ||
          // morador nao possui bloco informado no login
          (getters['isPossuiPerfil']('MORADOR') && !usuario.unidade.bloco.some(bl => bl.id === this.getBlocoLogin.id))) {
          commit('apagarToken')
          throw new Error('Usuário não está vinculado ao condomínio informado. Procure o Síndico do seu condomínio.')
        } else if (getters['isPossuiPerfil'](['SINDICO', 'SUBSINDICO', 'FUNCIONARIO']) &&
            (!usuario.funcionario || !usuario.funcionario.condominios || !this.getCondominioLogin) &&
          usuario.funcionario.condominios.some(cond => cond.id === this.getCondominioLogin.id)) {
          commit('apagarToken')
          throw new Error('Usuário não está vinculado ao condomínio informado. Procure o Síndico do seu condomínio.')
        } */
      }
    }
    return true
  } catch (err) {
    console.error(err)
    return false
  }
}
export const hasRole = ({ getters }, holes) => {
  // verifico se existe exigencia de perfil
  if (!holes || holes.length === 0) return true
  let perfis = getters.getUsuario.perfis
  // verifico se o usuario possui o perfil
  return holes.some(role => perfis && perfis.some(perfil => perfil === role))
}
