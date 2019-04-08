import Vue from 'vue'

export default Vue.extend({
  name: 'MyForm',

  props: {
    autofocus: Boolean
  },

  mounted () {
    this.validateIndex = 0
    this.autofocus === true && this.focus()
  },

  methods: {
    validate () {
      const promises = []

      this.validateIndex++

      // const components = getAllChildren(this)
      const components = []
      const emit = res => {
        this.$emit('validation-' + (res === true ? 'success' : 'error'))
      }

      for (let i = 0; i < components.length; i++) {
        const comp = components[i]

        if (typeof comp.validate === 'function') {
          const valid = comp.validate()

          if (typeof valid.then === 'function') {
            promises.push(valid)
          } else if (valid !== true) {
            emit(false)
            return Promise.resolve(false)
          }
        }
      }

      if (promises.length === 0) {
        emit(true)
        return Promise.resolve(true)
      }

      const index = this.validateIndex

      return Promise.all(promises).then(
        res => {
          if (index === this.validateIndex) {
            emit(res[0])
            return res[0]
          }
        },
        () => {
          if (index === this.validateIndex) {
            emit(false)
            return false
          }
        }
      )
    },

    resetValidation () {
    }
  },

  render (h) {
    return h('form', {
      staticClass: 'my-form',
      on: {
        ...this.$listeners
      }
    }, this.$slots.default)
  }
})
