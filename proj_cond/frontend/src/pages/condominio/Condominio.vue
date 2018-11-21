<template>
  <router-view></router-view>
</template>

<script>
export default {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.$store.dispatch('auth/hasRole', ['ADMIN', 'SINDICO'])
        .then((res) => {
          if (res) next()
          else {
            this.$q.notify('Usuário logado nao tem acesso ao cadastro de condominio')
            next('/')
          }
        })
    })
  }
}
</script>

<style>

</style>
