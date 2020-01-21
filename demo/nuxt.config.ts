export default {
  mode: 'spa',
  /*
  ** Headers of the page
  */
  head: {
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    '@nuxtjs/vuetify'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  vuetify: {
    customVariables: ['@stampinup/vue-components/src/preset/variables.scss'],
    defaultAssets: {
      icons: false
    },
    preset: '@stampinup/vue-components/src/preset',
    treeShake: {
      loaderOptions: {
        match (_originalTag, { kebabTag, camelTag }) {
          if (kebabTag.startsWith('s-')) {
            return [camelTag, `import ${camelTag} from '@stampinup/vue-components/src/components/${camelTag}.vue'`]
          }
        }
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    transpile: [
      './../src/components'
    ],
    /*
    ** You can extend webpack config here
    */
    extend (_, __) {
    }
  }
}
