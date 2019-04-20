<template lang="pug">
  q-footer.page-footer.column.items-center.text-white.q-pt-lg.bg-primary
    q-img(src="../assets/logo1.png").logo
    div.title PI2 - Inspeção para Cabo de Aço
    div.btns.flex
      q-btn(@click="goToLink('https://github.com/pi2-inspecao-cabo-de-aco')" round flat icon="mdi-github-circle" size="20px")
      q-btn(@click="goToLink('https://app.zenhub.com/workspaces/pi2-5cb52d9e709ee87123145404')" round flat icon="mdi-view-dashboard" size="20px")
      q-btn(@click="goToLink('https://trello.com/pi_2_verificador_de_cabo')" round flat icon="mdi-trello" size="20px")
      q-btn(@click="goToLink('http://pi2-inspecao-cabo.slack.com')" round flat icon="mdi-slack" size="20px")
</template>

<script>
export default {
  name: 'PageHeader',
  methods: {
    goToLink (link) {
      window.open(link, '_blank')
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~quasar-variables'

.page-footer
  background #2e435f
  padding-bottom 30px

.logo
  max-width 70px
  margin-top -60px
  margin-bottom 30px

.title
  font-size 16px
  text-align center
  color white

.btns
  margin-top 24px
</style>
