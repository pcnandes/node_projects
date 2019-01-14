export default ({ Vue }) => {
  // Vue.prototype.$axios = axios
  Vue.mixin({
    methods: {
      modalConfirmaExclusao (titulo = 'Confirma exclusão?') {
        return this.$q.dialog({
          title: titulo,
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
