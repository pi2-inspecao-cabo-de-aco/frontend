<template lang="pug">
  div.full-width.column.items-centers
    div(v-if="percentage < 0.7").card.q-pa-sm.text-center.text-white.q-mb-lg.bg-yellow-9.shadow-global.animate-pop
      | O robô só percorreu {{ percentage * 100 }}% do cabo. Para uma análise mais precisa, faça um monitoramento completo.
    div.full-width.flex
      div.column.flex-1.q-mr-md
        div.full-width.flex.q-mb-md
          div.bg-primary.card.shadow-global.flex-1.q-pa-md.q-mr-md
            div.label.text-grey-4.q-mb-sm Status Geral
            div.position.text-center.text-white
              span(:class="generalStateColor") {{ currentCable.general_state }}
          div.bg-primary.card.shadow-global.flex-1.q-pa-md
            div.label.text-grey-4.q-mb-sm Recomendação
            div.text-h6.text-bold.text-center.text-white.q-mt-sm
              span(:class="alertLevelColor") {{ alertLevel[currentCable.general_state] }}
        div.full-width.flex.q-mb-md
          div.bg-primary.card.shadow-global.flex-1.q-pa-md.q-mr-md
            div.label.text-grey-4.q-mb-sm Estado normal
            div.position.text-center
              span.text-positive {{ states.normal }}
              span.text-body1.q-ml-xs.text-white posições
          div.bg-primary.card.shadow-global.flex-1.q-pa-md
            div.label.text-grey-4.q-mb-sm Estado danificado
            div.position.text-center
              span.text-red-6 {{ states.danificado }}
              span.text-body1.q-ml-xs.text-white posições
        div.full-width.flex.q-mb-md
          div.bg-primary.card.shadow-global.flex-1.q-pa-md.q-mr-md
            div.label.text-grey-4.q-mb-sm Reportes manuais
            div.position.text-center
              span.text-yellow-9 {{ manualStateCount }}
              span.text-body1.q-ml-xs.text-white erros
          div.bg-primary.card.shadow-global.flex-1.q-pa-md
            div.label.text-grey-4.q-mb-sm Tempo de execução
            div.position.text-center.text-white
              span {{ totalTime }}
        div.full-width.flex
          div.bg-primary.card.shadow-global.flex-1.q-pa-md.q-mr-md
            div.label.text-grey-4.q-mb-sm Estado normal (RNA)
            div.position.text-center
              span.text-positive {{ (rnaAnalyze || {}).normal }}
              span.text-body1.q-ml-xs.text-white posições
          div.bg-primary.card.shadow-global.flex-1.q-pa-md
            div.label.text-grey-4.q-mb-sm Estado danificado (RNA)
            div.position.text-center
              span.text-red-6 {{ (rnaAnalyze || {}).error }}
              span.text-body1.q-ml-xs.text-white posições
      div.column.image
        q-img(:src="imagePath || '../../assets/cable-placeholder2.png'" transition="slide-left" spinner-color="grey-1" :ratio="1").shadow-global.card.q-mb-md
        div.bg-primary.card.shadow-global.flex-1.q-pa-md
          div.label.text-grey-4.q-mb-sm
           | Condição do cabo na posição {{ (currentAnalysis || {}).position_start }} à {{ (currentAnalysis || {}).position_end }} mm
          div.position.text-center.text-white
            div.text-h5.text-bold.text-center.text-white.q-mt-md
              span(:class="alertLevelColor") {{ (currentAnalysis || {}).state }}
    div.full-width.flex.item-center.q-mt-lg.justify-center
      q-btn(color="accent" no-caps @click="$router.push('/overview')").no-shadow.btn Sair
</template>

<script>
import REPORT_COMPLETE from '../../graphql/queries/report-complete.gql'
import REPORT_ERRORS from '../../graphql/queries/report-errors.gql'
import { mapGetters } from 'vuex'
import { DateTime } from 'luxon'

export default {
  name: 'SummaryReport',
  props: {
    percentage: {
      type: Number,
      required: true
    },
    rnaAnalyze: {
      type: Object,
      required: true
    },
    analysisLength: {
      type: Number,
      default: 0
    }
  },
  apollo: {
    report () {
      return {
        query: REPORT_COMPLETE,
        variables: {
          id: this.currentReportId
        },
        fetchPolicy: 'network-only',
        update (data) {
          this.analyzesSize = data.reportComplete.analysis.length
          return data.reportComplete
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
      analyzesSize: 0,
      analysisPosition: 0,
      states: {},
      alertLevel: {
        'Normal': 'Uso normal do cabo',
        'Danificado': 'Descarte Imediato'
      }
    }
  },
  computed: {
    ...mapGetters('cables', [
      'currentCable'
    ]),
    ...mapGetters('reports', [
      'currentReportId'
    ]),
    reportAnalysis () {
      return (this.report || { analysis: [] }).analysis
    },
    totalTime () {
      let start = new Date((this.report || {}).start)
      let end = new Date((this.report || {}).end)
      let total = Math.abs(end - start)
      let d = DateTime.fromMillis(total)
      return d.toFormat('mm:ss')
    },
    manualStateCount () {
      return this.reportAnalysis.filter((ra) => {
        return ra.manual_state
      }).length
    },
    generalStateColor () {
      return {
        'text-positive': this.currentCable.general_state === 'Normal',
        'text-red-6': this.currentCable.general_state === 'Danificado'
      }
    },
    alertLevelColor () {
      return {
        'text-positive': this.currentCable.general_state === 'Normal',
        'text-yellow-9': this.currentCable.general_state === 'Danificado'
      }
    },
    analysisColor () {
      return {
        'text-positive': this.currentAnalysis.state === 'Normal',
        'text-red-6': this.currentAnalysis.state === 'Danificado'
      }
    },
    currentAnalysis () {
      return (this.reportAnalysis || [])[this.analysisPosition]
    },
    imagePath () {
      return (this.currentAnalysis || { image_path: '' }).image_path.replace('/server', '')
    }
  },
  mounted () {
    if (this.analysisLength > 1) {
      setInterval(() => {
        if (this.analysisPosition < this.analysisLength - 1) {
          this.analysisPosition++
        } else {
          this.analysisPosition = 0
        }
      }, 3000)
    }
  }
}
</script>

<style lang="stylus" scoped>
.img
  width 150px

.card
  border-radius 4px

.label
  font-weight 500
  margin-right 5px
  font-size 16px

.position
  font-size 32px
  font-weight bold

.image
  width 370px

.btn
  padding 10px 25px
  border-radius 20px !important
</style>
