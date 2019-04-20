<template lang="pug">
  q-page.index.column.items-center.bg-secondary
    div.index-container.full-width.q-py-lg
      div.cards.flex.full-width.global-shadow
        div(v-for="c of cards").card.q-pa-md.q-pb-lg.bg-primary.flex-1.q-ma-sm.shadow-global
          h4.text-grey-3 {{ c.title }}
          h1(:class="{ 'text-positive': c.positive }").text-bold {{ c.value }}
      div.card.full-width.q-mt-lg.bg-primary.text-white.shadow-global.q-pa-md
        h2 Monitoramentos Anteriores
</template>

<style>
</style>

<script>
export default {
  name: 'PageIndex',
  data () {
    return {
      cards: [
        {
          title: 'Condições de uso',
          value: 'Normais',
          positive: true
        },
        {
          title: 'Vida útil',
          value: '18139',
          positive: false
        },
        {
          title: 'Tamanho',
          value: '12,41',
          positive: false
        },
        {
          title: 'Nível de alerta',
          value: 'Baixo',
          positive: false
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.index-container
  max-width 950px

.card
  border-radius 5px

  &:first-of-type
    margin-left 0

  &:last-of-type
    margin-right 0

  h4
    margin 0 0 15px 0
    text-align left
    font-size 16px
    line-height 20px
    font-weight 500

  h1
    margin 0
    font-size 38px
    line-height 38px
    text-align center
    color white

  h2
    margin 0 0 15px 0
    text-align left
    font-size 24px
    line-height 24px
    font-weight 500
</style>
