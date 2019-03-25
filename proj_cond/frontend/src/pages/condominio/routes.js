export default [
  { path: '',
    component: () => import(`./CondominioList.vue`),
    meta: {perfis: ['ADMIN', 'SINDICO']}
  },
  { path: 'novo',
    component: () => import(`./CondominioEdit.vue`),
    meta: {perfis: ['ADMIN', 'SINDICO']}
  },
  { path: ':id',
    component: () => import(`./CondominioEdit.vue`),
    meta: {perfis: ['ADMIN', 'SINDICO']}
  },
  { path: ':id/cadastro_funcionarios',
    component: () => import(`./CadastroFuncionarioList.vue`),
    itemMenu: true,
    tituloMenu: 'Cadastro de funcionário',
    icone: 'mdi-account',
    meta: {perfis: ['ADMIN', 'SINDICO']}
  },
  { path: ':id/cadastro_funcionarios/new',
    component: () => import(`./CadastroFuncionarioEdit.vue`),
    meta: {perfis: ['ADMIN', 'SINDICO']}
  },
  { path: ':id/cadastro_funcionarios/:funcionarioId',
    component: () => import(`./CadastroFuncionarioEdit.vue`),
    meta: {perfis: ['ADMIN', 'SINDICO']}
  },
  { path: ':id/:blocoId/:unidadeId',
    component: () => import(`./unidade/UnidadeEdit.vue`)
  }
]
