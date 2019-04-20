<template lang="pug">
  q-page.full-width.index.column.items-center.bg-secondary
    div.index-container.full-width.q-py-lg
      div.cards.flex.full-width.global-shadow
        div(v-for="c of cards").card.q-pa-lg.bg-primary.flex-1.q-ma-sm.shadow-global
          h4.text-grey-3 {{ c.title }}
          h1(:class="{ 'text-positive': c.positive }").text-bold {{ c.value }}
      div.card.column.no-wrap.full-width.q-mt-lg.bg-primary.text-white.shadow-global.q-pa-lg
        div.full-card-title.flex.items-center
          div.big-title.q-pr-lg Monitoramentos Anteriores
          q-btn(color="accent" no-caps).btn.no-shadow Novo Monitoramento
        div.summary-cards.flex.justify-between
          div(v-for="n in 6").summary-card.flex.q-pa-lg.flex.q-mb-lg.shadow-global
            q-img(src="../assets/wire-rope-basics-Full.jpg" :ratio="1").q-mr-md
            div.summary-infos.column
              div.flex.items-center.q-mb-sm
                div.label.text-grey-4 Condição:
                div.value {{ summary.condition }}
              div.flex.items-center.q-mb-sm
                div.label.text-grey-4 Data:
                div.value {{ summary.date }}
              div.flex.items-center.q-mb-sm
                div.label.text-grey-4  Tempo de execução:
                div.value {{ summary.time }}
              div.flex.items-center.q-mb-sm
                div.label.text-grey-4  Vida útil:
                div.value {{ summary.lifespan }}
              div.flex.items-center.q-mb-sm
                div.label.text-grey-4  Nível de Alerta:
                div.value {{ summary.alertLevel }}
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
      ],
      summary: {
        date: '03/04/2019',
        time: '7:31',
        lifespan: 134172,
        alertLevel: 'Baixo',
        condition: 'Normal'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.index-container
  max-width 950px
  padding-bottom 120px

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

.full-card-title
  margin 0 0 24px 0

.big-title
  text-align left
  font-size 24px
  line-height 24px
  font-weight 500

.btn
  padding 10px 25px
  border-radius 20px !important

.summary-cards
  flex-wrap wrap

.summary-card
  width 48%
  border-radius 5px
  background #2e435f

  .q-img
    max-width 150px
    border-radius 5px

.label
  font-weight 500
  margin-right 5px
  font-size 16px
</style>
