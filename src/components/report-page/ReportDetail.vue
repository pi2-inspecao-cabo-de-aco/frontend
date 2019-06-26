<template lang='pug'>
  div.q-pa-lg
    div.full-width.column.flex-1.justify-center.items-center
      div.report-detail.col-auto
        div.text-h6 Informações do cabo
        div.row
          div.col
            q-card
              div.attribute.flex
                div.label Pontos danificados:
                div.value {{ states.danificado }}
              q-separator
              div.attribute.flex
                div.label Pontos muito danificados:
                div.value {{ states.muitoDanificado }}
              q-separator
              div.attribute.flex
                div.label Pontos em bom estado:
                div.value {{ states.normal }}
          div.col
            q-card
              div.attribute.flex
                div.label Tamanho do cabo:
                div.value {{ showAttr(cable.size) }} cm
              q-separator
              div.attribute.flex
                div.label Status geral:
                div.value {{ showAttr(cable.general_state) }}

      div.report-detail.col-auto
        div.text-h6 Informações do Monitoramento
        div.row
          div.col
            q-card
              div.attribute.flex
                div.label Análises Manuais:
                div.value {{ reportsType.manu }}
              q-separator
              div.attribute.flex
                div.label Análises automáticas:
                div.value {{ reportsType.auto }}
              q-separator
              div.attribute.flex
                div.label Tempo total do Monitoramento
                div.value {{ totalTime }}
          div.col
            q-card
              div.attribute.flex
                div.label Info:
                div.value {{ 'info' }}
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
            q-select.filled(
                    label='Localização no cabo'
                    color='#1f2f46'
                    v-model="analysisId"
                    :options="selectOptions"
                    option-value="id"
                    option-label="position_start"
                    map-options
                    @input="searchAnalysis")
        div.row
          div.col
            div.text-bold Análise: {{ positions }}
              q-icon(color="red" name="place" style="font-size: 2em;")
        div.row(v-if="showAnalysisCard")
          div.col
            q-card
              div.attribute.flex
                div.label Estado do cabo:
                div.value {{ showAttr(analysis.state) }}
              q-separator
              div.attribute.flex
                div.label Problemas:
                div.value {{ analysisProblem }}
          div.col
            q-img(:src="imagePath" :ratio="1")

</template>

<script>
import { DateTime } from 'luxon'
import ANALYSIS from '../../graphql/queries/analysis.gql'
import REPORT_ERRORS from '../../graphql/queries/report-errors.gql'
import { mapGetters } from 'vuex'

export default {
  name: 'ReportDetail',
  props: {
    report: Object
  },
  apollo: {
    analysis () {
      return {
        query: ANALYSIS,
        skip: true,
        fetchPolicy: 'network-only',
        update (data) {
          return data.analysis
        }
      }
    },
    states () {
      return {
        query: REPORT_ERRORS,
        fetchPolicy: 'network-only',
        variables: {
          id: this.currentReportId
        },
        update (data) {
          return data.reportErrors
        }
      }
    }
  },
  data () {
    return {
      location: null,
      analysis: null,
      analysisId: 0,
      states: {
        danificado: 0,
        muitoDanificado: 0,
        normal: 0
      },
      reportsType: {
        auto: 0,
        manu: 0
      }
    }
  },
  methods: {
    async searchAnalysis () {
      try {
        this.$apollo.queries.analysis.setVariables({
          id: this.analysisId.id
        })
        this.$apollo.queries.analysis.skip = false
      } catch (err) {
        this.$q.notify({ message: 'Não existe nenhuma análise nessa posição', color: 'negative', icon: 'mdi-alert-circle-outline' })
        throw err
      }
    },
    showAttr (attr) {
      return (attr || '-')
    }
  },
  computed: {
    ...mapGetters('cables', [
      'currentCable'
    ]),
    ...mapGetters('reports', [
      'currentReportId'
    ]),
    selectOptions () {
      let options = this.report.analysis.map(a => {
        return { id: a.id, position_start: a.position_start }
      })
      return options
    },
    positions () {
      return this.analysis != null
        ? `${this.analysis.position_start} - ${this.analysis.position_end}` : '-'
    },
    showAnalysisCard () {
      return this.analysis != null
    },
    totalTime () {
      let start = new Date(this.report.start)
      let end = new Date(this.report.end)
      let total = Math.abs(end - start)
      let d = DateTime.fromMillis(total)
      return d.toFormat('mm:ss')
    },
    cable () {
      console.log(this.currentCable)
      return (this.currentCable || { id: '', lifespan: '' })
    },
    analysisState () {
      return this.analysis.state
    },
    analysisProblem () {
      return this.analysis.state === 'Normal' ? 'Nenhum' : 'Ruptura'
    },
    imagePath () {
      return this.analysis.image_path.replace('/server', '')
    }
  },
  mounted () {
    this.report.analysis.map(a => {
      // reports automaticos e manuais
      a.manual_state != null ? this.reportsType.manu += 1 : this.reportsType.auto += 1
    })
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
