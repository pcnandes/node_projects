import condominio from 'pages/cadastro/condominio/routes.js'

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
    component: () => import('pages/cadastro/condominio/Condominio.vue'),
    children: condominio,
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
