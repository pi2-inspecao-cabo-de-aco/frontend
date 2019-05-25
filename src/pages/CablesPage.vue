<template lang="pug">
  q-page.cable-page.full-width.q-py-lg.q-mb-xl
    div(:class="notificationClass").page-card.q-pa-sm.text-center.text-white.q-mb-lg
      | {{ notificationMessage }}
    div.page-card.q-pa-lg.bg-primary.shadow-global.column
      div.flex.items-center
        div.big-title.q-pr-lg.text-white {{ pageTitle }}
        q-btn(
          v-if="!newCable"
          @click="newCable = true"
          color="accent"
          no-caps
        ).btn.no-shadow Cadastrar novo cabo
      create-cable(v-if="newCable" @cancel-creation="newCable = false")
      cables-list(v-else)
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'CablesPage',
  components: {
    CreateCable: () => import('../components/cables-page/CreateCable'),
    CablesList: () => import('../components/cables-page/CablesList')
  },
  data () {
    return {
      cables: [],
      newCable: false
    }
  },
  computed: {
    ...mapGetters('cables', [
      'currentCable'
    ]),
    cableSelected () {
      return this.currentCable
    },
    pageTitle () {
      return this.newCable ? 'Cadastrar novo cabo' : 'Gerenciamento de Cabos'
    },
    notificationMessage () {
      return this.cableSelected
        ? `O cabo ${this.currentCable.name} foi selecionado! Clique em 'Continuar' para prosseguir`
        : 'É necessário ter um cabo selecionado para prosseguir'
    },
    notificationClass () {
      return {
        'animate-pop': this.cableSelected,
        'bg-positive': this.cableSelected,
        'bg-yellow-9': !this.cableSelected
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.page-card
  border-radius 5px

.big-title
  text-align left
  font-size 24px
  line-height 24px
  font-weight 500

.btn
  padding 10px 25px
  border-radius 20px !important
</style>
