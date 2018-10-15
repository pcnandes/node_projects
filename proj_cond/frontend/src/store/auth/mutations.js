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
  const usuarioLogado = false
  state.user = null
  localStorage.removeItem(ID_TOKEN)
  if (usuarioLogado) {
    this.$router.replace('/')
  }
}
