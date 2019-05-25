<template lang="pug">
  q-header.page-header.bg-primary.text-white.shadow-global
    q-toolbar.flex.justify-between.q-pa-md
      img(src="../assets/logo2.png" @click="$router.push('/')").logo.cursor-pointer
      div.flex
        q-btn(
          @click="$router.push('/')"
          icon="mdi-ray-start-end"
          color="white"
          text-color="primary"
          size="12px"
          round
        )
          q-tooltip Gerenciamento de cabos
        //- q-btn(icon="mdi-play" color="white" text-color="primary" size="12px" round).no-shadow.q-mr-md
        //- q-btn(icon="mdi-robot" color="white" text-color="primary" size="12px" round).no-shadow.q-mr-md
        //- q-btn(icon="mdi-file-document-box" color="white" text-color="primary" size="12px" round)
</template>

<script>
export default {
  name: 'PageHeader'
}
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.logo
  max-width 55px
</style>
