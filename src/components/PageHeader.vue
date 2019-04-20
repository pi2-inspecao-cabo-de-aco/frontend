<template lang="pug">
  q-header(reveal).page-header.bg-primary.text-white.shadow-global
    q-toolbar.flex.justify-between.q-pa-md
      img(src="../assets/logo2.png").logo
      div.flex
        q-btn(icon="mdi-play" color="white" text-color="primary" size="12px" round).no-shadow.q-mr-md
        q-btn(icon="mdi-robot" color="white" text-color="primary" size="12px" round).no-shadow.q-mr-md
        q-btn(icon="mdi-file-document-box" color="white" text-color="primary" size="12px" round).no-shadow.q-mr-md
        q-btn(icon="mdi-exit-to-app" color="accent" size="12px" round).no-shadow
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
