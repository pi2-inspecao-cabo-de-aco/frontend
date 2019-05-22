<template lang="pug">
  q-page.report-page.full-width.q-py-lg.q-mb-xl.flex.items-center
    div(:class="reporting ? 'bg-positive' : 'bg-grey-5'").card.full-width.q-pa-sm.text-center.text-white.q-mb-lg
      | {{ reporting ? 'Monitoraramento em andamento' : 'Monitoramento em pausa' }}
    div.full-width.flex
      q-img(src="../assets/img/cable-concat.jpg" :ratio="1").img.shadow-global.q-mr-lg
      div.report-content.flex-1
        div.q-mb-lg.flex
          div.q-mr-sm.flex-1.column.bg-primary.flex.card.shadow-global.q-pa-md
            div.label.text-grey-4.q-mb-sm Localização
            div.value.text-center.text-white
              span 1,5
              span.q-mx-sm -
              span 3,0 cm
          div.q-ml-sm.flex-1.column.bg-primary.flex.card.shadow-global.q-pa-md
            div.label.text-grey-4.q-mb-sm Reporte do sensor
            div.value.text-center.text-positive
              span Normal
        div.flex.justify-center.q-mb-md
          q-btn(
            @click="reporting = !reporting"
            :color="reporting ? 'grey-5' : 'positive'"
            round
            :icon="reporting ? 'mdi-pause' : 'mdi-play'"
            size="24px"
          ).shadow-global
        div.flex.items-center.justify-center
          q-btn(
            color="primary"
            round
            icon="mdi-arrow-left-bold"
            size="24px"
          ).shadow-global
          q-btn(
            color="warning"
            round
            icon="mdi-alert-circle"
            size="28px"
          ).q-mx-md.shadow-global
          q-btn(
            color="primary"
            round
            icon="mdi-arrow-right-bold"
            size="24px"
          ).shadow-global
        div.column.items-center.justify-center.q-mt-md
          q-btn(
            color="negative"
            round
            icon="mdi-stop"
            size="24px"
          ).shadow-global
</template>

<script>
export default {
  name: 'ReportPage',
  data () {
    return {
      reporting: false
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.card
  border-radius 5px

.img
  max-width 400px
  max-height 400px
  border-radius 5px

.label
  font-weight 500
  margin-right 5px
  font-size 16px

.value
  font-size 38px
  font-weight bold
</style>
