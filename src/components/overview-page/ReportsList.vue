<template lang="pug">
  div.card.column.no-wrap.full-width.q-mt-lg.bg-primary.text-white.shadow-global.q-pa-lg
    div.full-card-title.flex.items-center.q-mb-lg
      div.big-title.q-pr-lg Monitoramentos Anteriores
      q-btn(
        @click="$router.push('/report')"
        color="accent"
        :disabled="!currentCable"
        :title="currentCable ? 'Iniciar novo monitoramento' : 'É necessário ter um cabo selecionado para iniciar um monitoramento'"
        no-caps
      ).btn.no-shadow Novo Monitoramento
    div.report-cards.flex.justify-between
      report-card(v-for="report of reports" :key="report.id" :report="report")
</template>

<script>
import REPORTS from '../../graphql/queries/reports.gql'

import { mapGetters } from 'vuex'

export default {
  name: 'ReportsList',
  components: {
    ReportCard: () => import('../overview-page/ReportCard')
  },
  apollo: {
    reports () {
      return {
        query: REPORTS,
        fetchPolicy: 'network-only',
        skip: true,
        update (data) {
          return data.reports
        }
      }
    }
  },
  data () {
    return {
      reports: []
    }
  },
  computed: {
    ...mapGetters('cables', [
      'currentCable'
    ])
  },
  mounted () {
    if (this.currentCable) {
      this.$apollo.queries.reports.setVariables({ cableId: this.currentCable.id })
      this.$apollo.queries.reports.skip = false
    }
  }
}
</script>

<style lang="stylus" scoped>
.report-cards
  flex-wrap wrap

.big-title
  text-align left
  font-size 24px
  line-height 24px
  font-weight 500

.btn
  padding 10px 25px
  border-radius 20px !important

.card
  border-radius 5px
</style>
