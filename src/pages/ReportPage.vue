<template lang="pug">
  q-page.report-page.full-width.q-py-lg.q-mb-xl.flex.items-center
    error-modal(
      :visibility="errorVisibility"
      @change-visibility="changeErrorModalVisibility"
      @send-error-name="setErrorName"
    )
    cnn-analyzer(
      ref="cnnAnalyzer"
      :opened="cnnDialogOpened"
      :images-to-analyze="imagesToAnalyze"
      @close-cnn-dialog="cnnDialogOpened = false"
      @clean-images-to-analyze="imagesToAnalyze = []"
      @open-summary="summaryPage = true"
      @upload-rna-analyze="uploadRnaAnalyze"
    )
    div(v-if="!summaryPage").full-width.flex.items-center
      div(ref="robot").full-width.flex.q-mb-lg
        div.full-width.cable.bg-grey-7.q-my-lg
        q-img(src="../assets/robo2.png" :style="{ marginLeft: robotPosition }" spinner-color="grey-1").robot
      div.full-width.q-mb-lg.flex
        div.q-mr-sm.flex-1.column.bg-primary.flex.card.shadow-global.q-pa-md
          div.label.text-grey-4.q-mb-sm Posição
          div(v-if="!reporting && !reportCreated").position.text-center.text-white -
          div(v-else).position.text-center.text-white
            span {{ startPosition }}
            span.q-mx-sm -
            span {{ endPosition }}cm
        div.q-ml-sm.flex-1.column.bg-primary.flex.card.shadow-global.q-pa-md
          div.label.text-grey-4.q-mb-sm Reporte do sensor
          div(:class="[ getColor ]").value.text-center.text-white
            span {{ (!reporting && !reportCreated) ? '-' : currentSensorState }}
        div.q-ml-sm.flex-1.column.bg-primary.flex.card.shadow-global.q-pa-md
          div.label.text-grey-4.q-mb-sm Reporte manual
          div(:class="{ 'text-yellow-9': manualErrorName }").value.text-center.text-white
            span {{ (!reporting && !reportCreated) ? '-' : manualError }}
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
              :disabled="finished"
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
              :disabled="isEndCable || finished"
            ).shadow-global
          div.column.items-center.justify-center.q-mt-md
            q-btn(
              @click="sendResetCommand"
              color="negative"
              round
              icon="mdi-stop"
              size="32px"
            ).shadow-global
    summary-report(
      v-else
      :percentage="percentage"
      :rna-analyze="rnaAnalyze"
    )
</template>

<script>
import { start, pause, direction, reset } from '../api/commands'
import { mapGetters, mapActions } from 'vuex'
import { DateTime } from 'luxon'

import CREATE_REPORT from '../graphql/mutations/create-report.gql'
import UPDATE_CABLE from '../graphql/mutations/update-cable.gql'
import UPDATE_REPORT from '../graphql/mutations/update-report.gql'
import END_CABLE_SUBSCRIPTION from '../graphql/subscriptions/end-cable.gql'
import ANALYSIS_WAS_CREATED from '../graphql/subscriptions/analysis.gql'

export default {
  name: 'ReportPage',
  components: {
    ImageRenderer: () => import('../components/ImageRender'),
    ErrorModal: () => import('../components/report-page/ErrorModal'),
    CnnAnalyzer: () => import('../components/report-page/CnnAnalyzerDialog'),
    SummaryReport: () => import('../components/report-page/SummaryReport')
  },
  apollo: {
    $subscribe: {
      endCablePosition: {
        query: END_CABLE_SUBSCRIPTION,
        result ({ data }) {
          if (data) {
            this.isEndCable = true
            this.endCablePosition = data.endCable
            this.$q.notify({
              message: 'Sensor de fim de curso identificou um fim.',
              color: 'warning',
              icon: 'mdi-alert-circle-outline'
            })
          }
        }
      },
      analysis: {
        query: ANALYSIS_WAS_CREATED,
        async result ({ data }) {
          let analysis = data.analysisWasCreated
          let endPosition = parseInt(analysis.position_end) / 10
          let goingBack = endPosition < this.endPosition
          if ((data && !this.finished) || goingBack) {
            this.setCurrentAnalysis(data.analysisWasCreated)
          } else {
            if (this.finished) {
              this.reporting = false
              await stop()
            }
          }
        }
      }
    }
  },
  data () {
    return {
      rnaAnalyze: {},
      summaryPage: false,
      hasManualError: false,
      hasError: false,
      imagesToAnalyze: [],
      analyzes: [],
      analyzedImagesCount: [],
      cnnDialogOpened: false,
      reportCreated: false,
      reporting: false,
      errorVisibility: false,
      manualErrorName: '',
      currentPosition: 0,
      robotDivSize: 0,
      reportId: '',
      isEndCable: false,
      endCablePosition: +Infinity,
      errorIds: [],
      colors: {
        'Normal': 'text-positive',
        'Danificado': 'text-yellow-9',
        'Muito danificado': ['text-red-9', 'font-26']
      }
    }
  },
  computed: {
    ...mapGetters('cables', [
      'currentCable'
    ]),
    ...mapGetters('analysis', [
      'currentAnalysis',
      'position',
      'cable'
    ]),
    finished () {
      return this.endPosition >= this.cableSize
    },
    startPosition () {
      return (this.position.start || 0) / 10
    },
    getColor () {
      return this.colors[this.currentSensorState]
    },
    endPosition () {
      return (this.position.end || 0) / 10
    },
    cableSize () {
      return (this.cable.size || +Infinity) / 10
    },
    currentSensorState () {
      return (this.currentAnalysis || {}).state || '-'
    },
    manualError () {
      return this.manualErrorName ? this.manualErrorName : 'Nenhum'
    },
    robotPosition () {
      let width = this.robotDivSize - 150
      let position = ((this.startPosition + 2.5) / this.cableSize) * width
      return `${position}px`
    },
    percentage () {
      return ((this.position.end || 0) / this.position.end) * 100
    }
  },
  methods: {
    ...mapActions('cables', [
      'setCurrentCable'
    ]),
    ...mapActions('analysis', [
      'setCurrentAnalysis'
    ]),
    ...mapActions('reports', [
      'setCurrentReportId'
    ]),
    createCableAlert (color) {
      let cable = this.$refs.robot
      let div = document.createElement('div')
      div.style.width = `${((5) / this.cableSize) * (this.robotDivSize - 150)}px`
      div.id = this.currentAnalysis.id
      div.style.height = '15px'
      div.style.background = color
      div.style.position = 'absolute'
      div.style.marginLeft = this.robotPosition
      div.style.marginTop = '20px'
      div.style.zIndex = 1000
      cable.appendChild(div)
      div.classList.add('animate-pop')
    },
    addAlertToCable () {
      let color = {
        'Danificado': '#f9a825',
        'Muito danificado': '#c62828'
      }
      let isError = (this.currentSensorState === 'Danificado' || this.currentSensorState === 'Muito danificado')
      if (isError) {
        this.hasError = true
        this.createCableAlert(color[this.currentSensorState])
        this.errorIds.push(this.currentAnalysis.id)
      }
    },
    cleanErrorAlerts () {
      for (let err of this.errorIds) {
        let div = document.getElementById(err)
        div.remove()
      }
      this.errorIds = []
    },
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
        throw err
      }
    },
    async sendDirectionCommand (orientation) {
      try {
        this.reporting = false
        await direction(orientation)
        this.reporting = false
      } catch (err) {
        this.reporting = false
        console.log(err)
      }
    },
    async sendResetCommand () {
      try {
        await reset()
        this.reporting = false
        this.reportCreated = false
        this.updateCable()
        this.updateReport()
        this.reportId = ''
        this.cleanErrorAlerts()
        this.$q.notify({ message: 'Monitoramento encerrado!', color: 'positive', icon: 'mdi-check', timeout: 1500 })
        this.cnnDialogOpened = true
        await this.$refs.cnnAnalyzer.analyzeImages()
        this.hasError = false
        this.hasManualError = false
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
      this.hasManualError = true
      this.manualErrorName = error
    },
    async createReport () {
      if (this.currentCable) {
        try {
          let { data } = await this.$apollo.mutate({
            mutation: CREATE_REPORT,
            variables: {
              cableId: this.currentCable.id
            }
          })
          this.reportId = data.createReport
          this.setCurrentReportId(data.createReport)
          this.$q.notify({ message: 'Monitoramento iniciado!', color: 'positive', icon: 'mdi-check', timeout: 1500 })
          this.reportCreated = true
          this.reporting = true
          await start()
        } catch (err) {
          this.$q.notify({ message: 'Não foi possível iniciar o monitoramento', color: 'negative', icon: 'mdi-alert-circle-outline' })
          throw err
        }
      } else {
        this.$q.notify({ message: 'É necessário ter um cabo selecionado para iniciar o monitoramento', color: 'yellow-9', icon: 'mdi-alert-circle-outline' })
      }
    },
    async updateCable () {
      try {
        let variables = { id: this.currentCable.id }
        if (this.hasManualError || this.hasError) {
          variables.generalState = 'Danificado'
          variables.lifespan = 0
        } else {
          let created = DateTime.fromISO(this.currentCable.created_at)
          let today = 1
          let diff = created.diffNow('days').toObject()
          variables.lifespan = parseInt(this.currentCable.lifespan + today + diff.days)

          if (this.percentage >= 0.7) {
            variables.generalState = 'Normal'
          }
        }

        let { data } = await this.$apollo.mutate({
          mutation: UPDATE_CABLE,
          variables
        })
        this.setCurrentCable(data.updateCable)
      } catch (err) {
        this.$q.notify({ message: 'Não foi possível atualizar as informações cabo', color: 'negative', icon: 'mdi-alert-circle-outline' })
        throw err
      }
    },
    async updateReport () {
      try {
        await this.$apollo.mutate({
          mutation: UPDATE_REPORT,
          variables: {
            id: this.reportId
          }
        })
      } catch (err) {
        this.$q.notify({ message: 'Não foi possível atualizar as informações cabo', color: 'negative', icon: 'mdi-alert-circle-outline' })
        throw err
      }
    },
    fixPath (path) {
      let fixedPath = path.replace('/server', '')
      return fixedPath.replace('merged-image.png', '')
    },
    saveAnalysisImages () {
      this.imagesToAnalyze.push({
        id: (this.currentAnalysis || {}).id,
        path: this.fixPath((this.currentAnalysis || {}).image_path)
      })
    },
    uploadRnaAnalyze (analyze) {
      this.rnaAnalyze = analyze
    }
  },
  mounted () {
    this.robotDivSize = (this.$refs.robot || {}).clientWidth
  },
  watch: {
    position (val) {
      this.manualErrorName = ''
    },
    robotPosition () {
      this.addAlertToCable()
      if (this.reporting) {
        this.saveAnalysisImages()
      }
    }
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
  z-index 1001

.cable
  height 8px

.btn
  padding 15px 30px
  border-radius 30px !important

.font-26
  font-size 26px
</style>
