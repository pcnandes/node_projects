// import { date } from 'quasar'
import { _formataData, _maiorData, _maiorQueDataAtual } from '../shared/funcoes'

export default ({ Vue }) => {
  Vue.mixin({
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
      /* setNavItens (navItens) {
        return this.$store.commit('auth/setNavItens', navItens)
      }, */
      retiraMascara (text) {
        return text.replace(/\D/g, '')
      },
      carregarValoresCombo (obj) {
        return Object.keys(obj).map(key => ({ value: key, label: obj[key] }))
      },
      formataData (data) {
        return _formataData(data)
      },
      maiorData (dataIni, dataFim) {
        return _maiorData(dataIni, dataFim)
      },
      maiorQueDataAtual (dataIni) {
        return _maiorQueDataAtual(dataIni)
      },
      verificaErrosCampos (itens) {
        console.log('itennnns', itens)
        if (itens && itens.length > 0) {
          return itens.some(i => i === true)
        }
        return false
      }
    },
    computed: {
      getUsuarioLogado: function () {
        return this.$store.getters['auth/getUsuario']
      },
      getCondominioLogin: function () {
        return this.$store.getters['auth/getCondominioLogin']
      },
      getBlocoLogin: function () {
        return this.$store.getters['auth/getBlocoLogin']
      },
      /* getCondominioUsuarioLogado: function () {
        let usuario = this.getUsuarioLogado
        if (!usuario.unidade) return null
        else if (usuario.unidade.bloco) return usuario.unidade.bloco.condominio
        else return null
      }, */
      isMobile: function () {
        return !!this.$q.platform.is.mobile || this.$q.screen.lt.md
      },
      getPlataforma: function () {
        return this.$q.platform.is.name
      }
      /* getNavItens: function () {
        return this.$store.getters['auth/getNavItens']
      } */
    }
  })
}
