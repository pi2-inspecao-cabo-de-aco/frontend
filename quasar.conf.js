// Configuration for your app
const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:4000/'
const BACKEND_URL_WS = process.env.BACKEND_URL_WS || 'ws://localhost:4000/'
const ROBOT_URL = process.env.ROBOT_URL || 'http://localhost:3030'
const NET_API_URL = process.env.NET_API_URL || 'http://localhost:80'

module.exports = function (ctx) {
  return {
    // app boot file (/src/boot)
    // --> boot files are part of "main.js"
    boot: [
      'axios',
      'apollo'
    ],

    css: [
      'app.styl'
    ],

    extras: [
      'roboto-font',
      'material-icons', // optional, you are not bound to it
      // 'ionicons-v4',
      'mdi-v3',
      // 'fontawesome-v5',
      // 'eva-icons'
    ],

    framework: {
      all: true // --- includes everything; for dev only!

      // components: [
      //   'QLayout',
      //   'QHeader',
      //   'QDrawer',
      //   'QPageContainer',
      //   'QPage',
      //   'QToolbar',
      //   'QToolbarTitle',
      //   'QBtn',
      //   'QIcon',
      //   'QList',
      //   'QItem',
      //   'QItemSection',
      //   'QItemLabel'
      // ],

      // directives: [
      //   'Ripple'
      // ],

      // // Quasar plugins
      // plugins: [
      //   'Notify'
      // ]

      // iconSet: 'ionicons-v4'
      // lang: 'de' // Quasar language
    },

    supportIE: false,

    build: {
      scopeHoisting: true,
      vueRouterMode: 'history',
      // vueCompiler: true,
      // gzip: true,
      // analyze: true,
      // extractCSS: false,
      // chainWebpack (cfg) {
      //   // const cacheDirectory = 'node_modules/.cache/cache-loader'
      //   const rule = cfg.module
      //     .rule('gql')
      //     .test(/\.(gql|graphql)$/)
      //     .exclude
      //     .add(/node_modules/)
      //     .end()
      //     .use('cache-loader')
      //     .loader('cache-loader')
      //     .options({ cacheDirectory })
      //     .end()

      //   rule
      //     .use('gql-loader')
      //     .loader('graphql-tag/loader')
      //     .end()

      //   cfg.resolve
      //     .extensions
      //     .prepend('.mjs')
      // },
      env: {
        ROBOT_URL: JSON.stringify(ROBOT_URL),
        NET_API_URL: JSON.stringify(NET_API_URL)
      },
      extendWebpack (cfg) {
        cfg.module.rules.push({
          test: /\.mjs$/,
          include: /node_modules/,
          type: 'javascript/auto'
        })
        cfg.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /node_modules/
        })
        cfg.module.rules.push({
          test: /\.pug$/,
          loader: 'pug-plain-loader',
          exclude: /node_modules/,
          options: {
            cache: true
          }
        })
        cfg.module.rules.push({
          test: /\.(graphql|gql)$/,
          exclude: /node_modules/,
          loader: 'graphql-tag/loader'
        })
      }
    },

    devServer: {
      // https: true,
      // port: 8080,
      proxy: {
        '/graphql': {
          target: BACKEND_URL
        },
        '/graphql': {
          target: BACKEND_URL_WS,
          ws: true
        },
        '/public': {
          target: BACKEND_URL
        }
      },
      open: true // opens browser window automatically
    },

    // animations: 'all' --- includes all animations
    animations: [],

    ssr: {
      pwa: false
    },

    pwa: {
      // workboxPluginMode: 'InjectManifest',
      // workboxOptions: {},
      manifest: {
        // name: 'Quasar App',
        // short_name: 'Quasar-PWA',
        // description: 'Best PWA App in town!',
        display: 'standalone',
        orientation: 'portrait',
        background_color: '#ffffff',
        theme_color: '#027be3',
        icons: [
          {
            'src': 'statics/icons/icon-128x128.png',
            'sizes': '128x128',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-192x192.png',
            'sizes': '192x192',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-256x256.png',
            'sizes': '256x256',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-384x384.png',
            'sizes': '384x384',
            'type': 'image/png'
          },
          {
            'src': 'statics/icons/icon-512x512.png',
            'sizes': '512x512',
            'type': 'image/png'
          }
        ]
      }
    },

    cordova: {
      // id: 'org.cordova.quasar.app'
    },

    electron: {
      // bundler: 'builder', // or 'packager'

      extendWebpack (cfg) {
        // do something with Electron main process Webpack cfg
        // chainWebpack also available besides this extendWebpack
      },

      packager: {
        // https://github.com/electron-userland/electron-packager/blob/master/docs/api.md#options

        // OS X / Mac App Store
        // appBundleId: '',
        // appCategoryType: '',
        // osxSign: '',
        // protocol: 'myapp://path',

        // Window only
        // win32metadata: { ... }
      },

      builder: {
        // https://www.electron.build/configuration/configuration

        // appId: 'quasar-app'
      }
    }
  }
}
