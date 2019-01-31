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
      },
      setNavItens (navItens) {
        return this.$store.commit('auth/setNavItens', navItens)
      }
    },
    computed: {
      isMobile: function () {
        return !!this.$q.platform.is.mobile
      },
      getPlataforma: function () {
        return this.$q.platform.is.name
      },
      getNavItens () {
        return this.$store.getters['auth/getNavItens']
      }
    }
  })
}
