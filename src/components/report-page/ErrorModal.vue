<template lang="pug">
  q-dialog(:value="visibility" persistent)
    div.error-modal.card.bg-secondary.q-pa-lg
      div.big-title.text-white.q-mb-lg Reportar erro na posição
      div.errors.full.width.flex.justify-center.q-mb-xl
        div(v-for="(error, index) of errors" :key="index").column.items-center.q-mr-lg
          q-btn(
            size="30px"
            :flat="selected !== index"
            round
            :icon="error.icon"
            color="yellow-9"
            @click="selected = index"
          ).no-shadow
          div.text-center.text-white.q-mt-sm {{ error.name }}
      div.full-widht.flex.justify-center
        q-btn(
          @click="changeVisibility(false)"
          flat label="Cancelar"
          no-caps
          color="white"
        ).btn.q-mr-md.no-shadow
        q-btn(
          @click="reportManualError"
          label="Reportar erro"
          no-caps
          color="accent"
        ).btn.no-shadow
</template>

<script>
import SET_MANUAL_STATE from '../../graphql/mutations/set-analysis-manual-state.gql'
import { mapGetters } from 'vuex'

export default {
  name: 'ErrorModal',
  props: {
    visibility: {
      type: Boolean,
      required: true
    }
  },
  data () {
    return {
      selected: -1,
      errors: [
        {
          name: 'Oxidação',
          icon: 'mdi-invert-colors',
          value: 'oxidacao'
        },
        {
          name: 'Estricção',
          icon: 'mdi-arrow-expand-all',
          value: 'estriccao'
        },
        {
          name: 'Ruptura',
          icon: 'mdi-image-broken-variant',
          value: 'ruptura'
        }
      ]
    }
  },
  computed: {
    ...mapGetters('analysis', [
      'currentAnalysis'
    ])
  },
  methods: {
    async changeVisibility (value) {
      this.$emit('change-visibility', value)
    },
    async cancel () {
      this.selected = -1
      this.changeVisibility(false)
    },
    async setManualState (id, state) {
      try {
        await this.$apollo.mutate({
          mutation: SET_MANUAL_STATE,
          variables: {
            id,
            state
          }
        })
      } catch (err) {
        throw err
      }
    },
    async reportManualError () {
      if (this.selected > -1) {
        this.$emit('send-error-name', this.errors[this.selected].name)
        let { id } = this.currentAnalysis
        let manualState = this.errors[this.selected].value
        this.setManualState(id, manualState)
        this.changeVisibility(false)
        this.$q.notify({ message: `Erro ${this.errors[this.selected].name} reportado para esta posição`, color: 'positive', icon: 'mdi-check', timeout: 1000 })
        this.selected = -1
      } else {
        this.$q.notify({ message: 'Não foi possível reportar o erro', color: 'yellow-9', icon: 'mdi-alert-circle-outline', timeout: 1000 })
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.error-modal
  min-width 500px

.big-title
  text-align left
  font-size 24px
  line-height 24px
  font-weight 500

.btn
  padding 10px 25px
  border-radius 20px !important
</style>
