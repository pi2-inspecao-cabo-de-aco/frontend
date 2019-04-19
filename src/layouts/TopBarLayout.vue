<template lang="pug">
  q-layout(view="hHh lpr fFf")
    q-header(reveal).bg-primary.text-white.q-pa-sm.shadow-global
      q-toolbar
        q-toolbar-title
          q-avatar
            img(src="https://cdn.quasar-framework.org/logo/svg/quasar-logo.svg")

    q-page-container
      router-view

    // q-footer(reveal).bg-grey-8.text-white
    //   q-toolbar
    //     q-toolbar-title Title
</template>

<script>
export default {
  name: 'TopBarLayout'
}
</script>

<style>
</style>
