export default ({ Vue }) => {
  // Vue.prototype.$axios = axios
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
      }
    }
  })
}
