import condominio from '../pages/condominio/router'

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
      { path: '/cadastro_condominio', component: () => import('pages/condominio/Condominio.vue'), children: condominio },
      // { path: '/cadastro_condominio', component: () => import('pages/condominio/CadastroCondominio.vue') },
      { path: '/cadastro_usuario', component: () => import('pages/CadastroUsuario.vue') },
      { path: '/cadastro_colaborador', component: () => import('pages/CadastroColaborador.vue') },
      { path: '/agenda_condominio', component: () => import('pages/AgendaCondominio.vue') },
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
