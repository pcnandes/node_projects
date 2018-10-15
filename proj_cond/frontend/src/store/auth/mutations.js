import { ID_TOKEN } from '../../const'

export const setUsuario = (state, usuario) => {
  state.usuario = usuario
}

export const setLogado = (state, logado) => {
  state.logado = logado
}

export const clearToken = (state) => {
  if (state.timerToken) {
    clearTimeout(state.timer)
    state.timer = null
  }
  state.logado = false
  state.usuario = {}
  localStorage.removeItem(ID_TOKEN)
  // this.$router.replace('/')
}
