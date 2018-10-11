import { mostrarAlerta, hasRole } from '../../utils';

function acessoNegado (next) {
  mostrarAlerta('Usuário sem acesso ao cadastro de apurações especiais', 'negative', 'fa-warning', 4000);
  next('/');
}

export default [
  { path: '', component: () => import(`./ApesList.vue`), beforeEnter: (to, from, next) => {
    if (hasRole('ADMINISTRADOR')) {
      next();
    }
    else {
      acessoNegado(next);
    }
  }},
  { path: 'novo', component: () => import(`./ApesEdit.vue`), beforeEnter: (to, from, next) => {
    if (hasRole('ADMINISTRADOR')) {
      next();
    }
    else {
      acessoNegado(next);
    }
  }},
  { path: ':id', component: () => import(`./ApesEdit.vue`), beforeEnter: (to, from, next) => {
    if (hasRole('ADMINISTRADOR')) {
      next();
    }
    else {
      acessoNegado(next);
    }
  }}
]
