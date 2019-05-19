<template lang="pug">
  div.full-width.column.flex-1.justify-center
    div.q-pt-lg.column.items-center
      q-input(v-model="name" color="grey-2" label="Nome" dark filled).full-width.q-mb-md
      q-input(v-model="size" color="grey-2" label="Tamanho (em milímetros)" type="number" dark filled).full-width.q-mb-md
      q-input(v-model="diameter" color="grey-2" label="Diâmetro (em milímetros)" type="number" dark filled).full-width.q-mb-md
      q-input(v-model="lifespan" color="grey-2" label="Vida útil (em dias)" type="number" dark filled).full-width.q-mb-md
      div.full-width.q-mt-md.flex.justify-center
        q-btn(
          @click="cancelCreation"
          color="grey-1"
          flat
          no-caps
        ).btn.no-shadow.q-mr-md Cancelar
        q-btn(
          @click="createCable"
          color="accent"
          no-caps
        ).btn.no-shadow Cadastrar novo cabo
</template>

<script>
import CREATE_CABLE from '../../graphql/mutations/create-cable.gql'

export default {
  name: 'CreateCable',
  data () {
    return {
      name: '',
      size: null,
      diameter: null,
      lifespan: null
    }
  },
  computed: {
    validFields () {
      return this.name.trim().length > 0 && this.size.trim().length > 0 && this.diameter.trim().length > 0 && this.lifespan.trim().length > 0
    }
  },
  methods: {
    async createCable () {
      if (this.validFields) {
        try {
          await this.$apollo.mutate({
            mutation: CREATE_CABLE,
            variables: {
              name: this.name,
              lifespan: parseInt(this.lifespan),
              diameter: parseInt(this.diameter),
              size: parseInt(this.size)
            },
            refetchQueries: ['cables']
          })
          this.$q.notify({ message: 'Cabo cadastrado com sucesso', color: 'positive', icon: 'mdi-check', timeout: 2000 })
          this.cancelCreation()
        } catch (err) {
          this.$q.notify({ message: 'Não foi possível cadastrar o cabo', color: 'negative', icon: 'mdi-alert-circle-outline' })
          throw err
        }
      } else {
        this.$q.notify({ message: 'Todos campos devem ser preenchidos para cadastrar o cabo', color: 'yellow-9', icon: 'mdi-alert-circle-outline' })
      }
    },
    cancelCreation () {
      this.$emit('cancel-creation')
    }
  }
}
</script>

<style lang="stylus" scoped>
.btn
  padding 10px 25px
  border-radius 20px !important
</style>
