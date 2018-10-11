import { mostrarAlerta, hasRole } from '../../utils';

function acessoNegado (next) {
  mostrarAlerta('Usuário sem acesso ao cadastro de tabelas de-para', 'negative', 'fa-warning', 4000);
  next('/');
}

export default [
  { path: '', component: () => import(`./DeParaList.vue`), beforeEnter: (to, from, next) => {
    if (hasRole('ADMINISTRADOR')) {
      next();
    }
    else {
      acessoNegado(next);
    }
  }},
  { path: 'novo', component: () => import(`./DeParaEdit.vue`), beforeEnter: (to, from, next) => {
    if (hasRole('ADMINISTRADOR')) {
      next();
    }
    else {
      acessoNegado(next);
    }
  }},
  { path: ':id', component: () => import(`./DeParaEdit.vue`), beforeEnter: (to, from, next) => {
    if (hasRole('ADMINISTRADOR')) {
      next();
    }
    else {
      acessoNegado(next);
    }
  }}
]
