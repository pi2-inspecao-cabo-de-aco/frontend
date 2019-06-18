<template lang='pug'>
  div.q-pa-lg
    div.full-width.column.flex-1.justify-center.items-center
      div.report-detail.col-auto
        div.text-h6 Informações do cabo
        div.row
          div.col
            q-card
              div.attribute.flex
                div.label Pontos de ruptura:
                div.value {{ report }}
              q-separator
              div.attribute.flex
                div.label Pontos de oxidação:
                div.value {{ '3' }}
              q-separator
              div.attribute.flex
                div.label Status geral:
                div.value {{ 'Cabo está em bom estado' }}
          div.col
            q-card
              div.attribute.flex
                div.label Tamanho do cabo:
                div.value {{ '230 cm' }}
              q-separator
              div.attribute.flex
                div.label Info:
                div.value {{ 'iobjectnfo' }}
              q-separator
              div.attribute.flex
                div.label Info:
                div.value {{ 'info' }}
      div.report-detail.col-auto
        div.text-h6 Informações do Monitoramento
        div.row
          div.col
            q-card
              div.attribute.flex
                div.label Reportes Manuais:
                div.value {{ '4' }}
              q-separator
              div.attribute.flex
                div.label Reportes automáticos:
                div.value {{ '7' }}
              q-separator
              div.attribute.flex
                div.label Tempo total:
                div.value {{ '32' + ' min' }}
          div.col
            q-card
              div.attribute.flex
                div.label Tamanho do cabo:
                div.value {{ '230 cm' }}
              q-separator
              div.attribute.flex
                div.label Info:
                div.value {{ 'info' }}
              q-separator
              div.attribute.flex
                div.label Info:
                div.value {{ 'info' }}
      div.report-detail.col-auto
        div.text-h6 Análises
        div.row.justify-center
          div.col-md-4
            q-input.outlined(label='Localização no cabo' color='#1f2f46' v-model="location")
              q-btn(
                @click="searchAnalysis"
                color="accent"
                no-caps
                number
                icon='search'
              )
        div.row
          div.col
            div.text-bold Análise {{ location }}
              q-icon(color="red" name="place" style="font-size: 2em;")
        div.row
          div.col
            q-card
              div.attribute.flex
                div.label Estado do cabo:
                div.value {{ 'Não pode ser usado' }}
              q-separator
              div.attribute.flex
                div.label Problemas:
                div.value {{ 'Ruptura' }}
          div.col
            q-img(:src="'https://cdn.quasar.dev/img/parallax2.jpg'" :ratio="1")

</template>

<script>
import REPORT_ANALYSIS from '../../graphql/queries/report-analysis.gql'

export default {
  name: 'ReportDetail',
  props: {
    report: Object
  },
  data () {
    return {
      location: null,
      analysis: Object
    }
  },
  methods: {
    async searchAnalysis () {
      try {
        console.log(this.report)
        await this.$apollo.queries.reportAnalysis({
          variables: {
            reportId: this.report.id
          }
        })
      } catch (err) {
        this.$q.notify({ message: 'Não existe nenhuma análise nessa posição', color: 'negative', icon: 'mdi-alert-circle-outline' })
        throw err
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.report-detail
  width 90%
  padding 15px
  background #ffffff
  .attribute
    padding 10px 15px
    margin 5px 10px
    border-radius 10px
    .label
      font-size 100%
      margin-right 10px
  .col
    margin: 5px;
    .q-icon
      margin-left: 10px
</style>
