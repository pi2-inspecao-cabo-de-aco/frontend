<template lang="pug">
  div.full-width.column.flex-1.justify-center.items-center
    div(v-if="hasCables").full-width.text-center.q-py-lg.q-pb-xl.column.items-center
      div.table-box.full-width.column.bg-grey-2.shadow-global
        div.table.head.full-width.text-grey-8
          div.q-pa-sm
          div.q-pa-sm Nome
          div.q-pa-sm Tamanho (mm)
          div.q-pa-sm Diâmetro (mm)
          div.q-pa-sm Vida útil (dias)
        div(v-for="(cable,index) of cables" :key="index").table.cel.full-width.text-grey-8
          div.q-pa-sm
            q-btn(
              @click="selectCable(cable)"
              icon="mdi-check-circle"
              round
              flat
              :color="checkSelectedCable(cable) ? 'positive' : 'grey-4'"
            )
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
    div(v-else).text-center.q-pa-xl.column.items-center
      q-icon(name="mdi-alert-decagram" color="yellow-9" size="50px").q-mb-md
      div.text-white Nenhum cabo foi cadastrado até o momento
    q-btn(
      @click="$router.push('/overview')"
      color="positive"
      no-caps
      :disabled="!cableSelected"
      :title="cableSelected ? 'Clique para prosseguir' : 'Selecione um cabo para prosseguir'"
    ).btn.no-shadow Continuar
</template>

<script>
import CABLES from '../../graphql/queries/cables.gql'
import DELETE_CABLE from '../../graphql/mutations/delete-cable.gql'

import { mapGetters, mapActions } from 'vuex'

export default {
  name: 'CablesList',
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
    ...mapGetters('cables', [
      'currentCable'
    ]),
    hasCables () {
      return (this.cables || []).length > 0
    },
    cableSelected () {
      return this.currentCable
    }
  },
  methods: {
    ...mapActions('cables', [
      'setCurrentCable'
    ]),
    async deleteCable (id) {
      try {
        await this.$apollo.mutate({
          mutation: DELETE_CABLE,
          variables: {
            id
          },
          refetchQueries: ['cables']
        })
        this.setCurrentCable(null)
        this.$q.notify({ message: 'Cabo removido com sucesso', color: 'positive', icon: 'mdi-check', timeout: 2000 })
      } catch (err) {
        this.$q.notify({ message: 'Não foi possível remover o cabo', color: 'negative', icon: 'mdi-alert-circle-outline' })
        throw err
      }
    },
    selectCable (cable) {
      this.setCurrentCable(cable)
    },
    checkSelectedCable (cable) {
      return (this.currentCable || {}).id === cable.id
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.table-box
  border-radius 5px
  overflow hidden

.table
  display grid
  grid-template-columns 60px 2fr 1fr 1fr 1fr 60px
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

.btn
  padding 10px 25px
  border-radius 20px !important
</style>
