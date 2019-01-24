// import store from '../store'

export default ({ Vue }) => {
  // Vue.prototype.$axios = axios
  Vue.mixin({
    // store: store,
    methods: {
      modalConfirmaAcao (titulo = 'Confirma exclusão?', msg = null) {
        return this.$q.dialog({
          title: titulo,
          message: msg,
          ok: 'Confirmar',
          cancel: 'Cancelar'
        })
      },
      alertaSucesso (msg) {
        return this.$q.notify({
          color: 'positive',
          position: 'bottom',
          message: msg,
          icon: 'done'
        })
      },
      alertaErro (msg) {
        return this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: msg,
          icon: 'report_problem'
        })
      },
      possuiPerfil (perfil) {
        let perfis = []
        perfis.push(perfil)
        return this.$store.getters['auth/isPossuiPerfil'](perfis)
      },
      possuiPerfils (perfis) {
        this.$store.dispatch('auth/hasRole', perfis)
          .then((res) => {
            return res
          })
      }
    },
    computed: {
      classSituacao: function () {
        let classe = [null, '']
        switch (this.condominio.situacao) {
          case 'NÃO SALVO':
            classe = ['Informe um nome para o condomínio e clique em "Confirmar"', 'negative']
            break
          case 'RASCUNHO':
            classe = ['Adicione blocos e unidades e depois clique em "Finalizar condominio"', 'warning']
            break
          case 'INATIVO':
            classe = ['Condominio desativado no sistema', 'dark']
            break
        }
        return classe
      },
      alteravel: function () {
        return this.condominio.situacao !== 'ATIVO'
      }
    }
  })
}
