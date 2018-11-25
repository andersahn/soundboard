const pkg = require('./package')

let appName = 'Soundboard'
let router = {
  mode: 'hash',
};
let baseUrl = '/';
if (process.env.DEPLOY_ENV === 'GH_PAGES') {
  baseUrl = '/soundboard/';
  router = { ...router, base: baseUrl };
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
    title: appName,
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: pkg.description },

      { hid: 'web-app-title', name: 'apple-mobile-web-app-title', content: appName },
      { hid: 'application-name', name: 'application-name', content: appName },
      { hid: 'ms-tilecolor', name: 'msapplication-TileColor', content: "#000000" },
      { hid: 'msapp-config', name: 'msapplication-config', content: `${baseUrl}browserconfig.xml` },
      { hid: 'theme-color', content: "#000000" },
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: `${baseUrl}images/favicon.ico` },
      { rel: 'manifest', href: `${baseUrl}site.webmanifest` },
      { rel: 'apple-touch-icon', sizes: '180x180', href: `${baseUrl}images/apple-touch-icon.png` },
      { rel: 'icon', type: 'image/png', sizes: '32x32', href: `${baseUrl}images/favicon-32x32.png` },
      { rel: 'icon', type: 'image/png', sizes: '16x16', href: `${baseUrl}images/favicon-16x16.png` },
      { rel: 'mask-icon', type: 'image/png', href: `${baseUrl}images/safari-pinned-tab.svg`, color: '#000000' },
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#000' },

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
