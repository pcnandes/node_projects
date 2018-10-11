export default {
  computed: {
    loggedUser () {
      return this.$store.getters['auth/user'];
    },
    isAuthenticated () {
      return this.$store.getters['auth/isAuthenticated'];
    }
  },
  methods: {
    hasRole (roles) {
      return this.$store.getters['auth/hasRole'](roles);
    }
  }
}
