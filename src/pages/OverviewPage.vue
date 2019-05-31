<template lang="pug">
  q-page.full-width.index
    div(v-if="!currentCable").card.q-pa-sm.text-center.text-white.q-mb-lg.bg-yellow-9.animate-pop.q-mt-lg.q-mb-md
      | É necessário ter um cabo selecionado para utilizar os recursos
    div(:class="{ 'q-pt-lg': currentCable }").index-container.full-width.q-pb-lg
      div.cards.flex.full-width.global-shadow
        div.card.q-pa-lg.bg-primary.flex-1.q-ma-sm.shadow-global
          h4.text-grey-3 Condições de Uso
          h1(v-if="cable.general_state").text-bold {{ cable.general_state }}
          div(v-else).text-yellow-9.text-center.q-mt-md.q-pb-sm
            | Informação indisponível
            br
            | (Faça um monitoramento)
        div.card.q-pa-lg.bg-primary.flex-1.q-ma-sm.shadow-global
          h4.text-grey-3 Vida útil
          h1(v-if="cable.lifespan").text-bold
            | {{ cable.lifespan }}
            span.unity.q-ml-sm
              | dia
              span(v-if="cable.lifespan > 1") s
          div(v-else).text-yellow-9.text-center.q-mt-md.q-pb-sm Informação indisponível
        div.card.q-pa-lg.bg-primary.flex-1.q-ma-sm.shadow-global
          h4.text-grey-3 Tamanho
          h1(v-if="cable.size").text-bold
            | {{ cable.size }}
            span.unity.q-ml-sm mm
          div(v-else).text-yellow-9.text-center.q-mt-md.q-pb-sm Informação indisponível
        div.card.q-pa-lg.bg-primary.flex-1.q-ma-sm.shadow-global
          h4.text-grey-3 Nível de Alerta
          div(v-if="!cable.general_state").text-yellow-9.text-center.q-mt-md.q-pb-sm
            | Informação indisponível
            br
            | (Faça um monitoramento)
          h1(v-else).text-bold
            | {{ alertLevel[cable.general_state] }}
      reports-list
</template>

<style>
</style>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'OverviewPage',
  components: {
    ReportsList: () => import('../components/overview-page/ReportsList')
  },
  data () {
    return {
      alertLevel: {
        'Normal': 'Baixo',
        'Danificado': 'Atenção',
        'Descartável': 'Máximo'
      }
    }
  },
  computed: {
    ...mapGetters('cables', [
      'currentCable'
    ]),
    cable () {
      return (this.currentCable || { general_state: '', lifespan: null, size: null, diameter: null })
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.index-container
  padding-bottom 80px

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

.btn
  padding 10px 25px
  border-radius 20px !important

.unity
  font-size 18px
</style>
