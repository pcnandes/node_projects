// import condominio from 'pages/condominio/routes.js'

const routes = [
  {
    path: '/',
    component: () => import('layouts/Welcome.vue'),
    children: [
      { path: '', component: () => import('pages/Login.vue') }
    ]
  },
  {
    path: '/home',
    component: () => import('layouts/Home.vue'),
    children: [
      { path: '', component: () => import('pages/Home.vue') }
    ]
  },
  { path: '/condominio',
    component: () => import('layouts/Home.vue'),
    children: [
      { path: '', component: () => import('pages/condominio/CondominioList.vue'), meta: { perfis: ['ADMIN', 'SINDICO'] } },
      { path: 'novo', component: () => import('pages/condominio/CondominioEdit.vue'), meta: { perfis: ['ADMIN', 'SINDICO'] } },
      { path: ':id', component: () => import('pages/condominio/CondominioEdit.vue'), meta: { perfis: ['ADMIN', 'SINDICO'] } }
    ],
    itemMenu: true,
    tituloMenu: 'Cadastro de condomínio',
    icone: 'mdi-domain'
  }
]
// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
