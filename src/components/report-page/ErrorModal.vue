<template lang="pug">
  q-dialog(:value="visibility" persistent)
    div.error-modal.card.bg-secondary.q-pa-lg
      div.big-title.text-white.q-mb-lg Reportar erro na posição
      div.errors.full.width.flex.justify-center.q-mb-xl
        div(v-for="(error, index) of errors" :key="index").column.items-center.q-mr-lg
          q-btn(
            size="30px"
            :flat="selected !== index"
            round
            :icon="error.icon"
            color="yellow-9"
            @click="selected = index"
          ).no-shadow
          div.text-center.text-white.q-mt-sm {{ error.name }}
      div.full-widht.flex.justify-center
        q-btn(
          @click="changeVisibility(false)"
          flat label="Cancelar"
          no-caps
          color="white"
        ).btn.q-mr-md.no-shadow
        q-btn(
          @click="sendErrorName"
          label="Reportar erro"
          no-caps
          color="accent"
        ).btn.no-shadow
</template>

<script>
export default {
  name: 'ErrorModal',
  props: {
    visibility: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      selected: -1,
      errors: [
        {
          name: 'Oxidação',
          icon: 'mdi-invert-colors'
        },
        {
          name: 'Estricção',
          icon: 'mdi-arrow-expand-all'
        },
        {
          name: 'Ruptura',
          icon: 'mdi-image-broken-variant'
        }
      ]
    }
  },
  methods: {
    changeVisibility (value) {
      this.$emit('change-visibility', value)
    },
    cancel () {
      this.selected = -1
      this.changeVisibility(false)
    },
    sendErrorName () {
      if (this.selected > -1) {
        this.$emit('send-error-name', this.errors[this.selected].name)
        this.changeVisibility(false)
      } else {
        this.$q.notify({ message: 'Nenhum erro foi selecionado para reportar', color: 'yellow-9', icon: 'mdi-alert-circle-outline', timeout: 1000 })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.error-modal
  min-width 500px

.big-title
  text-align left
  font-size 24px
  line-height 24px
  font-weight 500

.btn
  padding 10px 25px
  border-radius 20px !important
</style>
