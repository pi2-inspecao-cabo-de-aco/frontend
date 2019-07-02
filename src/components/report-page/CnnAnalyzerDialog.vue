<template lang="pug">
  q-dialog(v-model="opened" persistent)
    div.cnn-analyze.bg-primary.full-width
      div(v-if="analyzing").column.items-center.text-white.q-pa-md.q-pb-xl
        img(src="../../assets/dna-loading.svg")
        div.text-h6.text-center
          | A Rede Neural está analisando as fotos
          q-spinner-comment(size="30px" color="primary").comment
        div.text-h2.text-center.q-mt-md.text-bold
          span 5/16
        div.text-body1.text-center.q-mb-xl fotos analisadas
        q-btn(color="accent" no-caps).no-shadow.btn Encerrar Monitoramento
      div(v-else).column.items-center.text-white.q-pa-md
</template>

<script>
export default {
  name: 'CnnAnalyzerDialog',
  props: {
    opened: {
      type: Boolean,
      required: true
    },
    analyzes: {
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
  methods: {
    countAnalyzes () {
      for (let analyze of this.analyzes) {
        analyze === 'Normal' ? this.normal++ : this.normal++
        this.count++
      }
      this.analyzing = false
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
</style>
