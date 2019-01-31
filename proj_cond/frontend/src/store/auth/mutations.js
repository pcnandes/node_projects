import { ID_TOKEN } from '../../const'

export const setUsuario = (state, usuario) => {
  state.usuario = usuario
}

export const setExpiracaoToken = (state, expiracaoToken) => {
  state.expiracaoToken = expiracaoToken
}

export function setNavItens (state, navItens) {
  console.log('setando nav itens', navItens)
  state.navItens = navItens
}

export const apagarToken = (state) => {
  if (state.timerToken) {
    clearTimeout(state.timer)
    state.timer = null
  }
  state.usuario = {}
  localStorage.removeItem(ID_TOKEN)
  state.expiracaoToken = null
}
