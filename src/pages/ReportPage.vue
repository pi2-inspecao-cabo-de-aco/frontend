<template lang="pug">
  q-page.report-page.full-width.q-py-lg.q-mb-xl.flex.items-center
    error-modal(
      :visibility="errorVisibility"
      async @change-visibility="changeErrorModalVisibility"
      @send-error-name="setErrorName"
    )
    div(ref="robot").full-width.flex.q-mb-lg
      div.full-width.cable.bg-grey-7.q-my-lg
      q-img(src="../assets/robo2.png" :style="{ marginLeft: robotPosition }" spinner-color="grey-1").robot
    div.full-width.q-mb-lg.flex
      div.q-mr-sm.flex-1.column.bg-primary.flex.card.shadow-global.q-pa-md
        div.label.text-grey-4.q-mb-sm Posição
        div(v-if="reporting").position.text-center.text-white
          span {{ startPosition }}
          span.q-mx-sm -
          span {{ endPosition }}cm
        div(v-else).position.text-center.text-white -
      div.q-ml-sm.flex-1.column.bg-primary.flex.card.shadow-global.q-pa-md
        div.label.text-grey-4.q-mb-sm Reporte do sensor
        div.value.text-center.text-white
          span {{ reporting ? 'Normal' : '-' }}
      div.q-ml-sm.flex-1.column.bg-primary.flex.card.shadow-global.q-pa-md
        div.label.text-grey-4.q-mb-sm Reporte manual
        div(:class="{ 'text-yellow-9': manualErrorName }").value.text-center.text-white
          span {{ reporting ? manualError : '-' }}
      div.q-ml-sm.flex-1.column.bg-primary.flex.card.shadow-global.q-pa-md.card-rna
        div.label.text-grey-4.q-mb-sm Reporte da Rede Neural
        div.value.text-center.text-white
          span -
    div.full-width.flex
      image-renderer
      div(v-if="!reportCreated").report-content.flex-1.justify-center.column.items-center
        q-btn(
          @click="createReport"
          color="accent"
          no-caps
          size="20px"
        ).no-shadow.btn.animate-pop Iniciar Monitoramento
      div(v-else).report-content.flex-1.justify-center.column.animate-pop
        div.flex.justify-center.q-mb-md
          q-btn(
            @click="sendStartOrPauseCommand"
            :color="reporting ? 'grey-5' : 'positive'"
            round
            :icon="reporting ? 'mdi-pause' : 'mdi-play'"
            size="32px"
          ).shadow-global
        div.flex.items-center.justify-center
          q-btn(
            @click="sendDirectionCommand('left')"
            color="primary"
            round
            icon="mdi-arrow-left-bold"
            size="32px"
          ).shadow-global
          q-btn(
            title="Reportar Erro"
            async @click="changeErrorModalVisibility(true)"
            color="warning"
            round
            icon="mdi-alert-circle"
            size="38px"
          ).q-mx-md.shadow-global
          q-btn(
            @click="sendDirectionCommand('right')"
            color="primary"
            round
            icon="mdi-arrow-right-bold"
            size="32px"
          ).shadow-global
        div.column.items-center.justify-center.q-mt-md
          q-btn(
            @click="sendResetCommand"
            color="negative"
            round
            icon="mdi-stop"
            size="32px"
          ).shadow-global
</template>

<script>
import { start, pause, direction, reset } from '../api/commands'
import { mapGetters } from 'vuex'
import CREATE_REPORT from '../graphql/mutations/create-report.gql'

export default {
  name: 'ReportPage',
  components: {
    ImageRenderer: () => import('../components/ImageRender'),
    ErrorModal: () => import('../components/report-page/ErrorModal')
  },
  data () {
    return {
      reportCreated: false,
      reporting: false,
      errorVisibility: false,
      manualErrorName: '',
      currentPosition: 0,
      robotDivSize: 0
    }
  },
  computed: {
    ...mapGetters('cables', [
      'currentCable'
    ]),
    ...mapGetters('analysis', [
      'position',
      'cable'
    ]),
    startPosition () {
      return (this.position.start || 0) / 10
    },
    endPosition () {
      return (this.position.end || 0) / 10
    },
    cableSize () {
      return (this.cable.size || 0) / 10
    },
    manualError () {
      return this.manualErrorName ? this.manualErrorName : 'Nenhum'
    },
    robotPosition () {
      let width = this.robotDivSize - 150
      let position = ((this.startPosition + 2.5) / this.cableSize) * width
      return `${position}px`
    }
  },
  methods: {
    async sendStartOrPauseCommand () {
      try {
        if (!this.reporting) {
          this.reporting = !this.reporting
          await start()
        } else {
          this.reporting = !this.reporting
          await pause()
        }
      } catch (err) {
        this.reporting = false
        console.log(err)
      }
    },
    async sendDirectionCommand (orientation) {
      try {
        await direction(orientation)
      } catch (err) {
        this.reporting = false
        console.log(err)
      }
    },
    async sendResetCommand () {
      try {
        await reset()
        this.reporting = false
      } catch (err) {
        this.reporting = false
        console.log(err)
      }
    },
    async changeErrorModalVisibility (value) {
      if (value) {
        this.reporting = false
        await pause()
      } else {
        this.reporting = true
        await start()
      }
      this.errorVisibility = value
    },
    setErrorName (error) {
      this.manualErrorName = error
    },
    async createReport () {
      if (this.currentCable) {
        try {
          await this.$apollo.mutate({
            mutation: CREATE_REPORT,
            variables: {
              cableId: this.currentCable.id
            }
          })
          this.$q.notify({ message: 'Monitoramento iniciado!', color: 'positive', icon: 'mdi-check', timeout: 1500 })
          this.reportCreated = true
          this.reporting = true
          await start()
        } catch (err) {
          this.$q.notify({ message: 'Não foi possível cadastrar o cabo', color: 'negative', icon: 'mdi-alert-circle-outline' })
          throw err
        }
      } else {
        this.$q.notify({ message: 'É necessário ter um cabo selecionado para iniciar o monitoramento', color: 'yellow-9', icon: 'mdi-alert-circle-outline' })
      }
    }
  },
  mounted () {
    this.robotDivSize = this.$refs.robot.clientWidth
  }
}
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.card
  border-radius 5px

.img
  max-width 400px
  max-height 400px
  border-radius 5px

.label
  font-weight 500
  margin-right 5px
  font-size 16px

.value
  font-size 38px
  font-weight bold

.position
  font-size 32px
  font-weight bold

.card-rna
  opacity 0.3

.robot
  max-width 150px
  position absolute
  margin-top 0.5px
  transition all 1.2s ease

.cable
  height 8px

.btn
  padding 15px 30px
  border-radius 30px !important
</style>
