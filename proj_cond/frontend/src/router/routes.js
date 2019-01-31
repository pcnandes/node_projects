import condominio from '../pages/condominio/routes'

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
      { path: '/condominio',
        component: () => import('pages/condominio/Condominio.vue'),
        children: condominio,
        itemMenu: true,
        tituloMenu: 'Cadastro de condomínio',
        icone: 'mdi-domain'
      },
      { path: '/cadastro_usuario',
        component: () => import('pages/CadastroUsuario.vue'),
        itemMenu: true,
        tituloMenu: 'Cadastro de usuário',
        icone: 'mdi-account'
      },
      { path: '/cadastro_colaborador',
        component: () => import('pages/CadastroColaborador.vue'),
        itemMenu: true,
        tituloMenu: 'Cadastro de colaborador',
        icone: 'mdi-worker'
      },
      { path: '/agenda_condominio',
        component: () => import('pages/AgendaCondominio.vue'),
        itemMenu: true,
        tituloMenu: 'Agenda do condomínio',
        icone: 'mdi-calendar'
      },
      { path: '/pre_assembleia',
        component: () => import('pages/PreAssembleia.vue'),
        itemMenu: true,
        tituloMenu: 'Pré-assembléia',
        icone: 'mdi-forum'
      },
      { path: '/assembleia',
        component: () => import('pages/Assembleia.vue'),
        itemMenu: true,
        tituloMenu: 'Assembléia',
        icone: 'mdi-gavel'
      },
      { path: '/livro_ocorrencia',
        component: () => import('pages/LivroOcorrencia.vue'),
        itemMenu: true,
        tituloMenu: 'Livro de ocorrência',
        icone: 'mdi-clipboard-account'
      },
      { path: '/chat_sindico', component: () => import('pages/ChatSindico.vue'), icone: 'mdi-chat' }
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
