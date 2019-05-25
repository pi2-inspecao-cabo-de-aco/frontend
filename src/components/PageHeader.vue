<template lang="pug">
  q-header.page-header.bg-primary.text-white.shadow-global
    q-toolbar.flex.justify-between.q-pa-md
      img(src="../assets/logo2.png" @click="$router.push('/overview')").logo.cursor-pointer
      div.flex
        q-btn(
          @click="$router.push('/report')"
          icon="mdi-play"
          color="white"
          text-color="primary"
          size="12px"
          round
          :disabled="!currentCable"
          :title="currentCable ? 'Iniciar novo monitoramento' : 'É necessário ter um cabo selecionado para iniciar um monitoramento'"
        ).no-shadow.q-mr-md.menu-btn
        q-btn(
          @click="$router.push('/overview')"
          icon="mdi-information-variant"
          color="white"
          text-color="primary"
          size="12px"
          round
          title="Informações sobre o cabo"
        ).q-mr-md.menu-btn
        q-btn(
          @click="$router.push('/')"
          icon="mdi-bullseye"
          color="white"
          text-color="primary"
          size="12px"
          round
          title="Gerenciamento de cabos"
        ).menu-btn
        //- q-btn(icon="mdi-robot" color="white" text-color="primary" size="12px" round).no-shadow.q-mr-md
        //- q-btn(icon="mdi-file-document-box" color="white" text-color="primary" size="12px" round)
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  name: 'PageHeader',
  computed: {
    ...mapGetters('cables', [
      'currentCable'
    ])
  }
}
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.logo
  max-width 55px
</style>

<style lang="stylus">
.menu-btn
  .q-icon
    margin-top 2px
</style>
