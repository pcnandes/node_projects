/*
export function someGetter (state) {
}
*/
export function isLogado (state) {
  console.log('verificando usuario logado')
  return state.logado
}

export function getUsuario (state) {
  return state.usuario
}
