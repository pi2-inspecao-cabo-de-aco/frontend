<template lang="pug">
  q-page.index.column.items-center.bg-secondary
    div.index-container.full-width.q-py-md
      div.cards.flex.full-width.global-shadow
        div(v-for="c of cards").card.q-pa-md.q-pb-lg.bg-primary.flex-1.q-ma-sm.shadow-global
          h4.text-grey-3 {{ c.title }}
          h1(:class="{ 'text-positive': c.positive }").text-bold {{ c.value }}
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
  height calc(100vh - 66px)

.card
  border-radius 5px

  h4
    margin 0 0 15px 0
    text-align left
    font-size 16px
    line-height 20px

  h1
    margin 0
    font-size 34px
    line-height 34px
    text-align center
    color white
</style>
