import { Configuration } from '@nuxt/types'

const config: Configuration = {
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
    '@nuxtjs/vuetify',
    '@nuxt/typescript-build'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
  ],
  router: {
    base: '/vue-components/demo/dist/'
  },
  vuetify: {
    customVariables: ['~/../src/preset/variables.scss'],
    preset: '~/../src/preset',
    treeShake: {
      loaderOptions: {
        match (_originalTag, { kebabTag, camelTag }) {
          if (kebabTag.startsWith('s-')) {
            return [camelTag, `import ${camelTag} from '~/../src/components/${camelTag}.vue'`]
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
      '~/../src/components'
    ],
    /*
    ** You can extend webpack config here
    */
    extend (_, __) {
    }
  }
}

export default config
