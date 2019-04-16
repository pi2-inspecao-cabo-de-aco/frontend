import VueApollo from 'vue-apollo'
import { createProvider } from './vue-apollo'

export default ({ app, store, Vue }) => {
  Vue.use(VueApollo)
  app.apolloProvider = createProvider()
}
