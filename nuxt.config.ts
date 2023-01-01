import eslintPlugin from 'vite-plugin-eslint'
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  css: ['vuetify/lib/styles/main.sass', '@mdi/font/css/materialdesignicons.min.css'],
  build: {
    transpile: ['vuetify']
  },
  modules: [
    '@pinia/nuxt'
  ],
  vite: {
    plugins: [
      eslintPlugin()
    ],
    define: {
      'process.env.DEBUG': false
    }
  }
})
