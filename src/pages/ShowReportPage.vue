<template lang="pug">
  report-detail(:report="report")
</template>

<script>
import REPORT_COMPLETE from '../graphql/queries/report-complete.gql'
import { mapGetters } from 'vuex'

export default {
  name: 'ShowReportPage',
  components: {
    ReportDetail: () => import('../components/report-page/ReportDetail')
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
          return data.reportComplete
        }
      }
    }
  },
  data () {
    return {
      report: {}
    }
  },
  computed: {
    ...mapGetters('reports', [
      'currentReportId'
    ])
  }
}
</script>

<style>

</style>
