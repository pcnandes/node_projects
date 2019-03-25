import { ID_TOKEN } from '../../const'

export const setUsuario = (state, usuario) => {
  state.usuario = usuario
}

export const setExpiracaoToken = (state, expiracaoToken) => {
  state.expiracaoToken = expiracaoToken
}

export function setCondominioLogin (state, condominioLogin) {
  state.condominioLogin = condominioLogin
}

export function setBlocoLogin (state, blocoLogin) {
  state.blocoLogin = blocoLogin
}

/* export function setTitulo (state, titulo) {
  state.titulo = titulo
} */

export const apagarToken = (state) => {
  if (state.timerToken) {
    clearTimeout(state.timer)
    state.timer = null
  }
  state.usuario = {}
  localStorage.removeItem(ID_TOKEN)
  state.expiracaoToken = null
  state.titulo = ''
}
