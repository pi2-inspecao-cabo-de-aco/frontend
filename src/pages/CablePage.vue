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
              div.name.q-pa-sm Nome
              div.size.q-pa-sm Tamanho
              div.diameter.q-pa-sm Diâmetro
              div.lifespan.q-pa-sm Vida útil
            div(v-for="(cable,index) of cables" :key="index").table.cel.full-width.text-grey-8
              div.name.q-pa-sm {{ cable.name }}
              div.size.q-pa-sm {{ cable.size }}
              div.diameter.q-pa-sm {{ cable.diameter }}
              div.lifespan.q-pa-sm {{ cable.lifespan }}
        div(v-else).text-center.q-pa-lg.column.items-center
          q-icon(name="mdi-alert-decagram" color="warning" size="50px").q-mb-md
          div.text-white Nenhum cabo foi cadastrado até o momento
</template>

<script>
import CABLES from '../graphql/queries/cables.gql'

export default {
  name: 'CablePage',
  apollo: {
    cables () {
      return {
        query: CABLES,
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
  grid-template-columns 2fr 1fr 1fr 1fr
  grid-template-rows 1fr
  text-align left

.head
  font-weight 500
  background $grey-4
  border-bottom solid 1px $grey-4

.cel
  border-bottom solid 1px $grey-4

  &:last-of-type
    border-bottom none
</style>
