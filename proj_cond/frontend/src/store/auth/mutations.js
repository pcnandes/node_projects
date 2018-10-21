import { ID_TOKEN } from '../../const'

export const setUsuario = (state, usuario) => {
  state.usuario = usuario
}

export const apagarToken = (state) => {
  if (state.timerToken) {
    clearTimeout(state.timer)
    state.timer = null
  }
  state.usuario = {}
  localStorage.removeItem(ID_TOKEN)
}
