<template lang="pug">
  div.full-width.column.flex-1.justify-center
    div.q-pt-lg.column.items-center
      q-input(
        v-for="(input, index) of inputs"
        :key="index"
        v-model="input.model"
        dense
        color="grey-2"
        :label="input.label"
        dark
        filled
      ).full-width.q-mb-md
      div.full-width.q-mt-md.flex.justify-center
        q-btn(
          @click="cancelCreation"
          color="grey-1"
          flat
          no-caps
        ).btn.no-shadow.q-mr-md Cancelar
        q-btn(
          @click=""
          color="accent"
          no-caps
        ).btn.no-shadow Cadastrar novo cabo
</template>

<script>
export default {
  name: 'CreateCable',
  data () {
    return {
      name: '',
      size: '',
      diameter: '',
      lifespan: '',
      inputs: [
        {
          label: 'Nome',
          model: this.name
        },
        {
          label: 'Tamanho (em milímetros)',
          model: this.size
        },
        {
          label: 'Diâmetro (em milímetros)',
          model: this.diameter
        },
        {
          label: 'Vida útil (em dias)',
          model: this.lifespan
        }
      ]
    }
  },
  methods: {
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
