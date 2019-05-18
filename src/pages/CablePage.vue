<template lang="pug">
  q-page.cable-page.full-width.q-py-lg
    div.page-card.q-pa-lg.bg-primary.shadow-global.column
      div.flex.items-center
        div.big-title.q-pr-lg.text-white Controle de Cabos
        q-btn(color="accent" no-caps).btn.no-shadow Cadastrar novo cabo
      div.full-width.column.flex-1.justify-center
        div(v-if="hasCables").text-center.q-py-lg.column.items-center
          div.table-box.full-width.column.bg-grey-2.shadow-global
            div.table.head.full-width.text-grey-8
              div.q-pa-sm Nome
              div.q-pa-sm Tamanho
              div.q-pa-sm Diâmetro
              div.q-pa-sm Vida útil
            div(v-for="(cable,index) of cables" :key="index").table.cel.full-width.text-grey-8
              div.q-pa-sm {{ cable.name }}
              div.q-pa-sm {{ cable.size }}
              div.q-pa-sm {{ cable.diameter }}
              div.q-pa-sm {{ cable.lifespan }}
              div.q-pa-sm
                q-btn(
                  @click="deleteCable(cable.id)"
                  icon="mdi-delete"
                  round
                  flat
                  color="accent"
                )
        div(v-else).text-center.q-pa-lg.column.items-center
          q-icon(name="mdi-alert-decagram" color="warning" size="50px").q-mb-md
          div.text-white Nenhum cabo foi cadastrado até o momento
</template>

<script>
import CABLES from '../graphql/queries/cables.gql'
import DELETE_CABLE from '../graphql/mutations/delete-cable.gql'

export default {
  name: 'CablePage',
  apollo: {
    cables () {
      return {
        query: CABLES,
        fetchPolicy: 'network-only',
        update (data) {
          return data.cables
        }
      }
    }
  },
  data () {
    return {
      cables: []
    }
  },
  computed: {
    hasCables () {
      return (this.cables || []).length > 0
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

.table-box
  border-radius 5px
  overflow hidden

.table
  display grid
  grid-template-columns 2fr 1fr 1fr 1fr 60px
  grid-template-rows 1fr
  text-align left
  border-bottom solid 1px $grey-4
  align-items center

  &:last-of-type
    border-bottom none

.head
  font-weight 500
  background $grey-3
  font-size 15px
</style>
