/*
export function someGetter (state) {
}
*/
export function isLogado (state) {
  return state.user !== null
}

export function getUsuario (state) {
  return state.usuario
}
