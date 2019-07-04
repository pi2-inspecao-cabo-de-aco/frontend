<template lang="pug">
  q-dialog(v-model="opened" persistent)
    div.cnn-analyze.bg-primary.full-width
      div(v-if="analyzing").column.items-center.text-white.q-pa-md.q-pb-xl
        img(src="../../assets/dna-loading.svg").animate-pop
        div.text-h6.text-center
          | A Rede Neural está analisando as fotos
          q-spinner-comment(size="30px" color="primary").comment
        div.text-h2.text-center.q-mt-md.text-bold
          span {{ count }}
          span /
          span {{ imagesToAnalizeLength }}
        div.text-body1.text-center.q-mb-lg fotos analisadas
      div(v-else).column.items-center.text-white.q-pa-md.animate-fade
        div.flex.q-mb-lg.q-mt-md
          q-img(src="../../assets/logo3.png").q-mb-lg.img
          div.text-h1.text-center.text-bold.q-mr-sm
            span {{ count }}
          div.column.justify-center
            div.text-body1 posições do cabo
            div.text-body1 analisadas pela
            div.text-body1 Rede Neural
        div.flex.text-h5.q-mb-xs
          span.text-positive.q-pr-sm.text-bold Normal:
          span.text-white.q-pr-xs {{ normal }}
          span(v-if="normal === 1").text-white posição
          span(v-else).text-white posições
        div.flex.text-h5.q-mb-xl
          span.text-red-6.q-pr-sm.text-bold Danificado:
          span.text-white.q-pr-xs {{ error }}
          span(v-if="error === 1").text-white posição
          span(v-else).text-white posições
        q-btn(
          color="accent"
          no-caps
          @click="close"
        ).no-shadow.btn.q-mb-md Ver relatório final
</template>

<script>
import analyze from '../../api/analyze'

export default {
  name: 'CnnAnalyzerDialog',
  props: {
    opened: {
      type: Boolean,
      required: true
    },
    imagesToAnalyze: {
      type: Array,
      required: true
    }
  },
  data () {
    return {
      analyzing: true,
      count: 0,
      normal: 0,
      error: 0
    }
  },
  computed: {
    imagesToAnalizeLength () {
      return this.imagesToAnalyze.length
    }
  },
  methods: {
    async analyzeImages () {
      this.resetValues()
      this.analyzing = true
      try {
        for (let image of this.imagesToAnalyze) {
          let condition = await this.analyzeFolderImages(image.path)
          if (condition === 'Normal') {
            this.normal++
          } else {
            this.error++
          }
          this.count++
        }
        this.$emit('update-analysis-length', this.imagesToAnalyze.length)
        this.$emit('clean-images-to-analyze')
        this.$emit('update-rna-analyze', {
          normal: this.normal,
          error: this.error
        })
      } catch (err) {
        throw err
      } finally {
        this.analyzing = false
      }
    },
    async analyzeFolderImages (path) {
      let condition = 'Normal'
      for (let p = 1; p <= 4; p++) {
        let image = path + `imagem-cam-${p}.png`
        let body = { img: image }
        let analyzedImage = await analyze(body)
        let condition = analyzedImage.data.condition
        if (condition === 'Danificado') {
          return condition
        }
      }
      return condition
    },
    close () {
      this.$emit('close-cnn-dialog')
      this.$emit('open-summary')
    },
    resetValues () {
      this.count = 0
      this.normal = 0
      this.error = 0
    }
  }
}
</script>

<style lang="stylus" >
@import '~quasar-variables'

.comment
  margin-bottom -10px

.btn
  padding 10px 25px
  border-radius 20px !important

.img
  max-width 250px
</style>
