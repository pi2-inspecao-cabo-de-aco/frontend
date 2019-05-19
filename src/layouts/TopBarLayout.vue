<template lang="pug">
  q-layout(view="hHh lpr lfr").bg-secondary
    page-header
    q-page-container.full-width.column.items-center
      div.container.full-width
        router-view
      page-footer
</template>

<script>
import PageHeader from '../components/PageHeader'
import PageFooter from '../components/PageFooter'

export default {
  name: 'TopBarLayout',
  components: {
    PageHeader,
    PageFooter
  }
}
</script>

<style lang="stylus" scoped>
.container
  max-width 950px
</style>
