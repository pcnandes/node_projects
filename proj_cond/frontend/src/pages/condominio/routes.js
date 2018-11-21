export default [
  { path: '',
    component: () => import(`./CondominioList.vue`)
  },
  { path: 'novo',
    component: () => import(`./CondominioEdit.vue`)
  },
  { path: '{id}',
    component: () => import(`./CondominioEdit.vue`)
  }
]
