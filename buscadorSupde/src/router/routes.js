
export default [
  {
    path: '/',
    component: () => import('layouts/default'),
    children: [
      { path: '', component: () => import('pages/index') },
      { path: '/resultado/', component: () => import('pages/resultadoPesquisa') },
      { path: '/resultado/:pesquisa', props: true, component: () => import('pages/resultadoPesquisa') }
      // { path: '/resultado/:pesquisa/:tipoFiltro/:filtro', props: true, component: () => import('pages/resultadoPesquisa') }
    ]
  },

  { // Always leave this as last one
    path: '*',
    component: () => import('pages/404')
  }
]
