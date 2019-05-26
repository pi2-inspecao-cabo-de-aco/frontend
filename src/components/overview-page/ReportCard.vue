<template lang="pug">
  div.report-card.flex.q-pa-lg.flex.q-mb-lg.shadow-global
    q-img(src="../assets/wire-rope-basics-Full.jpg" :ratio="1")
    div.report-infos.column.q-ml-md.column.justify-around
      div.attribute.flex.items-center.q-mb-sm
        div.label.text-grey-4 Condição:
        div.value {{ report.alert_level || 'Indisponível' }}
      div.attribute.flex.items-center.q-mb-sm
        div.label.text-grey-4 Início:
        div.value {{ formatDateTime(report.start) }}
      div.attribute.flex.items-center.q-mb-sm
        div.label.text-grey-4  Fim:
        div.value {{ report.end || 'Indisponível' }}
      div.attribute.flex.items-center.q-mb-sm
        div.label.text-grey-4  Vida útil:
        div.value Indisponível
      div.attribute.flex.items-center
        div.label.text-grey-4  Nível de Alerta
        div.value Indisponível
</template>

<script>
import { DateTime } from 'luxon'

export default {
  name: 'ReportCard',
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  methods: {
    formatDateTime (datetime) {
      let millis = new Date(datetime).valueOf()
      let d = DateTime.fromMillis(millis)
      return d.toFormat('dd/MM/yyyy - HH:mm')
    }
  }
}
</script>

<style lang="stylus" scoped>
.report-card
  width 48%
  border-radius 5px
  background #2e435f

  .q-img
    max-width 150px
    max-height 150px
    border-radius 5px

.label
  font-weight 500
  margin-right 5px
  font-size 16px

.attribute
  line-height 20px
</style>
