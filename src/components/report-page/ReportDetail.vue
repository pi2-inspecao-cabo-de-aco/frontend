<template lang='pug'>
  div.q-pa-lg
    div.full-width.column.flex-1.justify-center.items-center
      div.report-detail.col-auto
        q-card
          q-card-section
            div.text-h6 Informações
          div.attribute.flex
            div.label Início:
            div.value {{ '10/10/2018' }}
          q-separator
          div.attribute.flex
            div.label Fim:
            div.value {{ '10/10/2018' }}
          q-separator
          div.attribute.flex
            div.label Nível de Alerta:
            div.value {{ 'High' }}

</template>

<script>
export default {
  name: 'ReportDetail',
  props: {
    report: {
      type: {
        start: '09/06/2019',
        end: '09/06/2019',
        alert_level: 'High'
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.report-detail
  width 80%
  padding 15px
  background #ffffff
  .attribute
    padding 10px 15px
    margin 5px 10px
    border-radius 10px
    .label
      font-size 100%
      margin-right 10px
</style>
