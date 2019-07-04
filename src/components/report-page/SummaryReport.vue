<template lang="pug">
  div.full-width.column.items-centers
    //- div(v-if="percentage < 0.7").page-card.q-pa-sm.text-center.text-white.q-mb-lg
    div.card.q-pa-sm.text-center.text-white.q-mb-lg.bg-yellow-9.shadow-global.animate-pop
      | O robô só percorreu {{ percentage * 100 }}% do cabo. Para uma análise mais precisa, faça um monitoramento completo.
    div.full-width.flex
      div.column.flex-1.q-mr-md
        div.bg-primary.card.shadow-global.flex-1.q-pa-md.q-mb-md
          div.label.text-grey-4.q-mb-sm Status Geral
          div.position.text-center.text-white
            span.text-red-6 Danificado
        div.full-width.flex.q-mb-md
          div.bg-primary.card.shadow-global.flex-1.q-pa-md.q-mr-md
            div.label.text-grey-4.q-mb-sm Estado normal
            div.position.text-center
              span.text-positive 10
              span.text-body1.q-ml-xs.text-white posições
          div.bg-primary.card.shadow-global.flex-1.q-pa-md
            div.label.text-grey-4.q-mb-sm Estado danificado
            div.position.text-center
              span.text-red-6 10
              span.text-body1.q-ml-xs.text-white posições
        div.full-width.flex.q-mb-md
          div.bg-primary.card.shadow-global.flex-1.q-pa-md.q-mr-md
            div.label.text-grey-4.q-mb-sm Reportes manuais
            div.position.text-center
              span.text-yellow-9 10
              span.text-body1.q-ml-xs.text-white erros
          div.bg-primary.card.shadow-global.flex-1.q-pa-md
            div.label.text-grey-4.q-mb-sm Tempo de execução
            div.position.text-center.text-white
              span 1:23
        div.full-width.flex
          div.bg-primary.card.shadow-global.flex-1.q-pa-md.q-mr-md
            div.label.text-grey-4.q-mb-sm Estado normal (RNA)
            div.position.text-center
              span.text-positive 10
              span.text-body1.q-ml-xs.text-white posições
          div.bg-primary.card.shadow-global.flex-1.q-pa-md
            div.label.text-grey-4.q-mb-sm Estado danificado (RNA)
            div.position.text-center
              span.text-red-6 10
              span.text-body1.q-ml-xs.text-white posições
      div.column.image
        q-img(src="../../assets/cable-placeholder2.png" spinner-color="grey-1" :ratio="1").shadow-global.card.q-mb-md
        div.bg-primary.card.shadow-global.flex-1.q-pa-md
          div.label.text-grey-4.q-mb-sm Recomendação
          div.position.text-center.text-white
            span.text-yellow-9 Descarte imediato
</template>

<script>
export default {
  name: 'SummaryReport'
}
</script>

<style lang="stylus" scoped>
.img
  width 150px

.card
  border-radius 4px

.label
  font-weight 500
  margin-right 5px
  font-size 16px

.position
  font-size 32px
  font-weight bold

.image
  width 370px
</style>
