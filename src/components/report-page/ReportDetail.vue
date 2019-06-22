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
                div.value {{ cableInfo.rups }}
              q-separator
              div.attribute.flex
                div.label Pontos em bom estado:
                div.value {{ cableInfo.normal }}
              q-separator
              div.attribute.flex
                div.label Status geral:
                div.value {{ showAttr(cable.general_state) }}
          div.col
            q-card
              div.attribute.flex
                div.label Tamanho do cabo:
                div.value {{ showAttr(cable.size) }} cm
              q-separator

      div.report-detail.col-auto
        div.text-h6 Informações do Monitoramento
        div.row
          div.col
            q-card
              div.attribute.flex
                div.label Reportes Manuais:
                div.value {{ reportsType.manu }}
              q-separator
              div.attribute.flex
                div.label Reportes automáticos:
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
                    map-options)
            q-btn(
              @click="searchAnalysis"
              color="accent"
              no-caps
              number
              icon='search'
            )

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
                div.value {{ 'Ruptura' }}
          div.col
            q-img(:src="'https://cdn.quasar.dev/img/parallax2.jpg'" :ratio="1")

</template>

<script>
import { DateTime } from 'luxon'
import ANALYSIS from '../../graphql/queries/analysis.gql'
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
    }
  },
  data () {
    return {
      location: null,
      analysis: null,
      analysisId: 0,
      cableInfo: {
        normal: 0,
        rups: 0
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
    },
    updateDataInfo () {
      this.report.analysis.map(a => {
        // oxidacoes e rupturas
        if (a.state === 'normal') {
          this.cableInfo.normal += 1
        } else if (a.state === 'rup') {
          this.cableInfo.rups += 1
        }
        // reports automaticos e manuais
        a.manual_state ? this.reportsType.manu += 1 : this.reportsType.auto += 1
      })
    }
  },
  computed: {
    ...mapGetters('cables', [
      'currentCable'
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
      let start = new Date(this.report.start).valueOf()
      let end = new Date(this.report.end).valueOf()
      let total = DateTime.fromMillis(end - start)
      return total.toFormat('dd - HH:mm:ss')
    },
    cable () {
      console.log(this.currentCable)
      return (this.currentCable || { id: '', lifespan: '' })
    },
    analysisState () {
      return this.analysis.state === 'normal' ? 'Normal' : 'Danificado'
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
