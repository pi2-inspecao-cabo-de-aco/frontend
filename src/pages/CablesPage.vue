<template lang="pug">
  q-page.cable-page.full-width.q-py-lg
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
import DELETE_CABLE from '../graphql/mutations/delete-cable.gql'

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
    pageTitle () {
      return this.newCable ? 'Cadastrar novo cabo' : 'Controle de Cabos'
    }
  },
  methods: {
    async deleteCable (id) {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_CABLE,
          variables: {
            id
          },
          refetchQueries: ['cables']
        })
        this.$q.notify({ message: 'Cabo removido com sucesso', color: 'positive', icon: 'mdi-check', timeout: 2000 })
      } catch (err) {
        this.$q.notify({ message: 'Não foi possível remover o cabo', color: 'negative', icon: 'mdi-alert-circle-outline' })
        throw err
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
