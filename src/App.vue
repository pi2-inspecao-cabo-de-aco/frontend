<template lang="pug">
  div#q-app
    h4 {{ info }}
    router-view
</template>

<script>
import INFO from './graphql/queries/info.gql'
export default {
  name: 'App',
  apollo: {
    info () {
      return {
        query: INFO
      }
    }
  },
  data () {
    return {
      info: ''
    }
  }
}
</script>

<style>
</style>
