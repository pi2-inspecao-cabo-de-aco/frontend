<template lang="pug">
  q-img(:src="imagePath || '../assets/img/cable-concat.jpg'" :ratio="1").img.shadow-global.q-mr-lg
</template>

<script>
import ANALYSIS_WAS_CREATED from '../graphql/subscriptions/analysis.gql'
import { QImg } from 'quasar'
import { mapActions } from 'vuex'
export default {
  name: 'ImageRender',
  components: {
    QImg
  },
  apollo: {
    $subscribe: {
      analysis: {
        query: ANALYSIS_WAS_CREATED,
        result ({ data }) {
          if (data) {
            this.analysis = data.analysisWasCreated
            this.setCurrentAnalysis(data.analysisWasCreated)
          }
        }
      }
    }
  },
  data () {
    return {
      analysis: {}
    }
  },
  computed: {
    imagePath () {
      return (this.analysis.image_path || '').replace('/server', '')
    }
  },
  methods: {
    ...mapActions('analysis', [
      'setCurrentAnalysis'
    ])
  }
}
</script>
