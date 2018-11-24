const pkg = require('./package')

let router = {}
let baseUrl = '/';
if (process.env.DEPLOY_ENV === 'GH_PAGES') {
  baseUrl = '/soundboard/';
  router = { base: baseUrl };
}

module.exports = {
  mode: 'universal',
  router,
  env: {
    baseUrl,
  },
  /*
  ** Headers of the page
  */
  head: {
    title: pkg.name,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description }
    ],
    link: [
      {
        rel: 'icon', type: 'image/x-icon',
        href: `${baseUrl}favicon.ico`
      },
      {
        rel: 'manifest',
        href: `${baseUrl}manifest.json`,
      },
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
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
  ],
  /*
  ** Axios module configuration
  */
  axios: {
    // See https://github.com/nuxt-community/axios-module#options
  },

  plugins: [
    '~/plugins/sounds.js',
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {

    }
  }
}
