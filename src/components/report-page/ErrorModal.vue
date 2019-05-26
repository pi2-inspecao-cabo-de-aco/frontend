<template lang="pug">
  q-dialog(v-model="visibility")
    div.error-modal.card.bg-secondary.q-pa-lg
      div.big-title.text-white.q-mb-lg Reportar erro
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
        q-btn(flat label="Cancelar" no-caps color="white" v-close-popup).btn.q-mr-md.no-shadow
        q-btn(label="Reportar erro" no-caps color="accent").btn.no-shadow
</template>

<script>
export default {
  name: 'ErrorModal',
  data () {
    return {
      visibility: true,
      selected: null,
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
