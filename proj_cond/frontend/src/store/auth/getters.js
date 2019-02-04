
export function getUsuario (state) {
  return state.usuario
}

export function getExpiracaoToken (state) {
  return state.expiracaoToken
}

export function getCondominios (state) {
  return state.condominios
}

export function getTitulo (state) {
  return state.titulo
}

export function isPossuiPerfil (state) {
  return (perfis) => {
    // verifico se existe exigencia de perfil
    if (!perfis || perfis.length === 0) return true
    let _perfis = state.usuario.perfis
    if (!_perfis) return false
    // verifico se o usuario possui o perfil
    return perfis.some(_perfil => _perfis.some(perfil => perfil === _perfil))
  }
}
