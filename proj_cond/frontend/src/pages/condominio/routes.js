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
  { path: ':id/:blocoId/:unidadeId',
    component: () => import(`./UnidadeEdit.vue`)
  }
]
