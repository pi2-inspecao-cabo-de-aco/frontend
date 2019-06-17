<template lang="pug">
  report-detail
</template>

<script>
import REPORT from '../graphql/queries/report.gql'
import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'ShowReportPage',
  components: {
    ReportDetail: () => import('../components/report-page/ReportDetail')
  },
  apollo: {
    report () {
      return {
        query: REPORT,
        variables: {
          id: this.currentReportId
        },
        fetchPolicy: 'network-only',
        update (data) {
          return data.report
        }
      }
    }
  },
  data () {
    return {
      report: Object
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
