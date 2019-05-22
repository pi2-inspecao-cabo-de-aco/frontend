<template lang="pug">
  q-img(:src="imagePath || '../assets/img/cable-concat.jpg'" :ratio="1").img.shadow-global.q-mr-lg
</template>

<script>
import {
  QImg
} from 'quasar'
import ANALYSIS_WAS_CREATED from '../graphql/subscriptions/analysis.gql'
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
          }
        }
      }
    }
  },
  computed: {
    imagePath () {
      return (this.analysis.image_path || '').replace('/server', '')
    }
  },
  data () {
    return {
      analysis: {}
    }
  }
}
</script>

<style lang="stylus" scoped>
</style>
