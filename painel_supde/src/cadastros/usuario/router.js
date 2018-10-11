import { mostrarAlerta, loggedUser, hasRole } from '../../utils'

function acessoNegado (next) {
  mostrarAlerta('Usuário sem acesso ao cadastro de perfis', 'negative', 'fa-warning', 4000);
  next('/')
}

export default [
  { path: '', component: () => import(`src/cadastros/usuario/UsuarioList.vue`), beforeEnter: (to, from, next) => {
    if (hasRole('HABILITADOR')) {
      next();
    }
    else {
      acessoNegado(next);
    }
  }},
  { path: ':cpf', component: () => import(`src/cadastros/usuario/UsuarioEdit.vue`), beforeEnter: (to, from, next) => {
    if (hasRole('HABILITADOR') || loggedUser().cpf === to.params.cpf) {
      next();
    }
    else {
      acessoNegado(next);
    }
  }}
]
