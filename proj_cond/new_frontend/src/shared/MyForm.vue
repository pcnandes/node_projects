<template>
  <q-form ref="myForm">
    <slot></slot>
  </q-form>
</template>

<script>
export default {
  name: 'my-form',
  data () {
    return {
    }
  },
  methods: {
    resetValidation () {
      // this.$refs.myForm.resetValidation()
    },
    tratarErros () {
      return new Promise((resolve, reject) => {
      // this.$refs.myForm.validate()
        let components = []
        this.getAllChildren(this.$refs.myForm.$children, components)
        console.log(components)
        let erro = false
        if (components) {
          if (components.some(e => e.erroRequired === true)) {
            this.alertaErro('Preencha as informações do obrigatórias.')
            erro = true
          }
          components.forEach(e => e.erros.forEach(msg => {
            if (msg) {
              this.alertaErro(msg)
              erro = true
            }
          }))
        }
        erro ? reject() : resolve(true)
      })
    },
    getAllChildren (itens, retorno) {
      if (itens.length > 0) {
        itens.forEach(child => {
          if (child.erroRequired || (child.erros && child.erros.length > 0)) {
            retorno.push(child)
            if (child.$children.length > 0) this.getAllChildren(child.$children, retorno)
          }
        })
      }
      return retorno
    }
  }
}
</script>
