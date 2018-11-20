function acessoNegado (next) {
  this.$q.notify('Usuário logado nao tem acesso ao cadastro de condominio')
  next('/')
}

export default [
  { path: '',
    component: () => import(`./CondominioList.vue`),
    beforeEnter: (to, from, next) => {
      if (this.auth.hasRole(['ADMINISTRADOR', 'SINDICO'])) {
        next()
      } else {
        acessoNegado(next)
      }
    }
  },
  { path: 'novo',
    component: () => import(`./CondominioEdit.vue`),
    beforeEnter: (to, from, next) => {
      if (this.auth.hasRole('ADMINISTRADOR')) {
        next()
      } else {
        acessoNegado(next)
      }
    }
  }
]
