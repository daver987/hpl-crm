export default defineNuxtConfig({
  modules: [
    '@nuxtjs/supabase',
    '@vueuse/nuxt',
    'nuxt-vitest',
    '@unocss/nuxt',
    '@huntersofbook/naive-ui-nuxt',
    '@nuxtjs/color-mode',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
  ],

  build: {
    transpile: ['libphonenumber-js', 'trpc-nuxt'],
  },

  typescript: {
    strict: true,
    shim: true,
  },

  nitro: {
    preset: 'netlify',
  },

  css: [
    'ag-grid-enterprise/styles/ag-grid.css',
    'ag-grid-community/styles/ag-theme-alpine.css',
  ],

  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: '#A57C52FF',
        primaryColorSuppl: 'rgba(165, 124, 82, 1)',
        primaryColorHover: '#BD9975FF',
        primaryColorPressed: '#8A6642FF',
        bodyColor: '#121417',
      },
    },
  },

  runtimeConfig: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    FASTTRACK_PARTNER_ACCESS_KEY: process.env.FASTTRACK_PARTNER_ACCESS_KEY,
    FASTTRACK_SYSTEM_ID: process.env.FASTTRACK_SYSTEM_ID,
    FASTTRACK_USER_PASSWORD: process.env.FASTTRACK_USER_PASSWORD,
    FASTTRACK_USER_EMAIL: process.env.FASTTRACK_USER_EMAIL,
    NUXT_SECRET: process.env.NUXT_SECRET,
    EVER_TRANSIT_API_KEY: process.env.EVER_TRANSIT_API_KEY,
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      WEBSITE_URL: process.env.WEBSITE_URL,
    },
  },

  vite: {
    resolve: {
      alias: { '.prisma/client/index-browser': `@prisma/client/index-browser` },
    },
  },
})
