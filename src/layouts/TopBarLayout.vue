<template lang="pug">
  q-layout(view="hHh lpr fFf")
    page-header
    q-page-container
        router-view
</template>

<script>
import PageHeader from '../components/PageHeader'
export default {
  name: 'TopBarLayout',
  components: {
    PageHeader
  }
}
</script>
