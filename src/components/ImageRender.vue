<template lang="pug">
  q-img(:src="imagePath || '../assets/cable-placeholder.png'" spinner-color="grey-1" :ratio="1").img.shadow-global.q-mr-lg
</template>

<script>
import { QImg } from 'quasar'
import { mapGetters } from 'vuex'

export default {
  name: 'ImageRender',
  components: {
    QImg
  },
  computed: {
    ...mapGetters('analysis', [
      'currentAnalysis'
    ]),
    analysis () {
      return this.currentAnalysis || {}
    },
    imagePath () {
      return (this.analysis.image_path || '').replace('/server', '')
    }
  }
}
</script>
