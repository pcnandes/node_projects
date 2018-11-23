export default [
  { path: '',
    component: () => import(`./CondominioList.vue`),
    meta: {perfis: ['bunda', 'SINDICO']}
  },
  { path: 'novo',
    component: () => import(`./CondominioEdit.vue`),
    meta: {perfis: ['bunda', 'SINDICO']}
  },
  { path: '{id}',
    component: () => import(`./CondominioEdit.vue`),
    meta: {perfis: ['ADMIN', 'SINDICO']}
  }
]
