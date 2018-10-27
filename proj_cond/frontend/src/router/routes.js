
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
      { path: '', component: () => import('pages/Home.vue') },
      { path: '/cadastro_morador', component: () => import('pages/CadastroMorador.vue') },
      { path: '/pre_assembleia', component: () => import('pages/PreAssembleia.vue') },
      { path: '/assembleia', component: () => import('pages/Assembleia.vue') },
      { path: '/livro_ocorrencia', component: () => import('pages/LivroOcorrencia.vue') },
      { path: '/chat_sindico', component: () => import('pages/ChatSindico.vue') }
    ]
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
