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
      }
    }
  })
}
