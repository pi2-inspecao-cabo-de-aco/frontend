<template lang="pug">
  q-layout(view="hHh lpr lfr")
    page-header
    q-page-container
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
