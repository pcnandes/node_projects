// import store from '../store'
import {date} from 'quasar'

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
          icon: 'mdi-alert'
        })
      },
      possuiPerfil (perfil) {
        let perfis = []
        perfis.push(perfil)
        return this.$store.getters['auth/isPossuiPerfil'](perfis)
      },
      possuiPerfis (perfis) {
        return this.$store.getters['auth/isPossuiPerfil'](perfis)
      },
      setNavItens (navItens) {
        return this.$store.commit('auth/setNavItens', navItens)
      },
      retiraMascara (text) {
        return text.replace(/\D/g, '')
      },
      carregarValoresCombo (obj) {
        return Object.keys(obj).map(key => ({value: key, label: obj[key]}))
      },
      formataData (data) {
        return data ? date.formatDate(data, 'DD/MM/YYYY') : null
      },
      maiorData (dataIni, dataFim) {
        let diff = date.getDateDiff(dataIni, dataFim, 'days')
        return diff < 0
      },
      maiorQueDataAtual (dataIni) {
        let diff = date.getDateDiff(dataIni, new Date(), 'days')
        return diff <= 0
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
