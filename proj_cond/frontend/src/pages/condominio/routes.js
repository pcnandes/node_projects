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
  { path: ':id/bloco/:bloco_id',
    component: () => import(`./BlocoEdit.vue`),
    meta: {perfis: ['ADMIN', 'SINDICO']}
  },
  { path: ':id/bloco/novo',
    component: () => import(`./BlocoEdit.vue`),
    meta: {perfis: ['ADMIN', 'SINDICO']}
  }
]
