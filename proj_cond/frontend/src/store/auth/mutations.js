import { ID_TOKEN } from '../../const'

export const setUsuario = (state, usuario) => {
  state.usuario = usuario
}

export const clearToken = (state) => {
  if (state.timerToken) {
    clearTimeout(state.timer)
    state.timer = null
  }
  const usuarioLogado = !!state.user
  state.user = null
  localStorage.removeItem(ID_TOKEN)
  if (usuarioLogado) {
    this.$router.replace('/')
  }
}
