import vuetify, { transformAssetUrls } from 'vite-plugin-vuetify'

export default defineNuxtConfig({
  app: {
    baseURL: '/voker-chan/',
    head: {
      title: 'voker-chan',
      htmlAttrs: {
        lang: 'en'
      },
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'format-detection', content: 'telephone=no' },
        { property: 'twitter:card', content: "summary" },
        { property: 'og:title', content: 'voker-chan' },
        { property: 'og:description', content: '投票ちゃん' },
        { property: 'og:image', content: './favicon.ico' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: './favicon.ico' }
      ],

    }
  },

  devtools: { enabled: true },

  build: {
    transpile: ['vuetify']
  },

  plugins: [
    '~/plugins/vuetify.ts'
  ],

  css: [
    'vuetify/styles'
  ],

  modules: [
    (_options, nuxt) => {
      nuxt.hooks.hook('vite:extendConfig', (config) => {
        // @ts-expect-error
        config.plugins.push(vuetify({ autoImport: true }))
      })
    }
  ],

  vite: {
    vue: {
      template: {
        transformAssetUrls
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          api: "modern-compiler"
        }
      }
    }
  },

  compatibilityDate: '2024-11-18'
});