import decode from 'jwt-decode'
import axios from 'axios'
import router from '../router'

const AUTH_API = 'auth';
const ID_TOKEN_KEY = 'session-token';

export default {
  namespaced: true,
  state: {
    user: null,
    timer: null
  },
  getters: {
    isAuthenticated (state) {
      return state.user !== null
    },
    user (state) {
      return state.user
    },
    hasRole (state) {
      return (roles) => {
        if (!state.user) {
          return false;
        }
        // se for passado apenas um valor então transforma-o em array
        if (roles && !Array.isArray(roles)) {
          roles = [roles];
        }
        if (roles === null || roles === undefined || roles.length === 0) {
          return true;
        }
        if (state.user.roles) {
          for (var i = 0; i < roles.length > 0; i++) {
            if (state.user.roles.indexOf(roles[i]) >= 0) {
              return true;
            }
          }
        }
        return false
      }
    }
  },
  mutations: {
    setUser (state, user) {
      state.user = user;
    },
    clearToken (state) {
      if (state.timer) {
        clearTimeout(state.timer);
        state.timer = null;
      }
      const wasLoggedin = !!state.user;
      state.user = null;
      localStorage.removeItem(ID_TOKEN_KEY);
      if (wasLoggedin) {
        router.replace('/login');
      }
    }
  },
  actions: {
    setToken ({commit, dispatch, state}, encodedToken) {
      if (encodedToken) {
        var decodedToken = decode(encodedToken);
        if (decodedToken.exp) {
          const expirationDate = new Date(0);
          const now = new Date();
          expirationDate.setUTCSeconds(decodedToken.exp);
          // verifica se o token não expirou
          if (expirationDate.getTime() > now.getTime()) {
            // constroi o objeto usuário a partir do token
            const user = {
              cpf: decodedToken.name,
              nome: decodedToken.params.nome,
              lotacao: decodedToken.params.lotacao,
              ug: decodedToken.params.ug,
              departamento: decodedToken.params.departamento,
              divisao: decodedToken.params.divisao,
              externo: (decodedToken.params.ug !== 'SUPDE'),
              roles: decodedToken.roles,
              esquemas: decodedToken.params.esquemas,
              visibilidade: decodedToken.params.visibilidade
            }
            // configura o cabeçalho padrão das requisições HTTP para conter o token
            axios.defaults.headers['Authorization'] = 'JWT ' + encodedToken;
            // cria um timer para atualização do token automaticamente
            state.timer = setTimeout(() => {
              dispatch('retoken')
            }, Math.max(expirationDate.getTime() - now.getTime() - 2000, 1));
            localStorage.setItem(ID_TOKEN_KEY, encodedToken);
            commit('setUser', user);
            // TODO: notificar outras abas sobre o login
            return true;
          }
        }
      }
      commit('clearToken');
      return false;
    },
    login ({dispatch}, credentials) {
      return axios.post(AUTH_API, credentials)
        .then(res => {
          return dispatch('setToken', res.data)
        })
    },
    logout ({commit}) {
      commit('clearToken');
    },
    tryAutoLogin ({dispatch}) {
      return dispatch('setToken', localStorage.getItem(ID_TOKEN_KEY));
    },
    retoken ({dispatch, commit}) {
      return axios.get(AUTH_API)
        .then(res => {
          dispatch('setToken', res.data)
        })
        .catch(res => {
          commit('clearToken')
        })
    }
  }
}
