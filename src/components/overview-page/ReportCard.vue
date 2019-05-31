<template lang="pug">
  div.report-card.flex.q-pa-lg.flex.q-mb-lg.shadow-global
    q-img(:src="randomImg" :ratio="1")
    div.report-infos.column.q-ml-md.column.justify-around
      div.attribute.flex.items-center.q-mb-sm
        div.label.text-grey-4 Início:
        div.value {{ formatDateTime(report.start) }}
      div.attribute.flex.items-center.q-mb-sm
        div.label.text-grey-4  Fim:
        div.value {{ formatDateTime(report.end) || 'Indisponível' }}
      div.attribute.flex.items-center.q-mb-sm
        div.label.text-grey-4  Vida útil:
        div.value {{ cable.lifespan }} dias
      div.attribute.flex.items-center
        div.label.text-grey-4  Distância:
        div.value {{ distance }} cm
</template>

<script>
import { DateTime } from 'luxon'
import { mapGetters } from 'vuex'

import REPORT_ANALYSIS from '../../graphql/queries/report-analysis.gql'

export default {
  name: 'ReportCard',
  apollo: {
    reportAnalysis () {
      return {
        query: REPORT_ANALYSIS,
        variables: {
          reportId: this.report.id
        },
        fetchPolicy: 'network-only',
        update (data) {
          return data.reportAnalysis
        }
      }
    }
  },
  data () {
    return {
      reportAnalysis: []
    }
  },
  props: {
    report: {
      type: Object,
      required: true
    }
  },
  computed: {
    ...mapGetters('cables', [
      'currentCable'
    ]),
    cable () {
      return (this.currentCable || { id: '', lifespan: '' })
    },
    distance () {
      return (this.reportAnalysis || []).length * 5
    },
    images () {
      return this.reportAnalysis.map(r => {
        return r.image_path.replace('/server', '')
      })
    },
    randomImg () {
      let length = (this.images || []).length
      return this.images[Math.floor(Math.random() * length)]
    }
  },
  methods: {
    formatDateTime (datetime) {
      let millis = new Date(datetime).valueOf()
      let d = DateTime.fromMillis(millis)
      return d.toFormat('dd/MM/yyyy - HH:mm:ss')
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
