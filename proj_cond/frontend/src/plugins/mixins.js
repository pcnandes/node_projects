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
          icon: 'mdi-check'
        })
      },
      alertaErro (msg) {
        return this.$q.notify({
          color: 'negative',
          position: 'bottom',
          message: msg,
          icon: 'msi-alert'
        })
      },
      possuiPerfil (perfil) {
        let perfis = []
        perfis.push(perfil)
        return this.$store.getters['auth/isPossuiPerfil'](perfis)
      },
      possuiPerfis (perfis) {
        this.$store.dispatch('auth/hasRole', perfis)
          .then((res) => {
            return res
          })
      },
      setNavItens (navItens) {
        return this.$store.commit('auth/setNavItens', navItens)
      },
      retiraMascara (text) {
        return text.replace(/\D/g, '')
      },
      carregarValoresCombo (obj) {
        return Object.keys(obj).map(key => ({label: key, value: obj[key]}))
      }
    },
    computed: {
      isMobile: function () {
        return !!this.$q.platform.is.mobile || this.$q.screen.lt.md
      },
      getPlataforma: function () {
        return this.$q.platform.is.name
      },
      getNavItens: function () {
        return this.$store.getters['auth/getNavItens']
      },
      getUsuarioLogado: function () {
        return this.$store.getters['auth/getUsuario']
      }
    }
  })
}
