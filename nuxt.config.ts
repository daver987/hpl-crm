export default defineNuxtConfig({
  modules: [
    '@vueuse/nuxt',
    'nuxt-vitest',
    '@nuxt/devtools',
    '@huntersofbook/naive-ui-nuxt',
    '@nuxtjs/color-mode',
    'nuxt-icon',
    [
      '@pinia/nuxt',
      {
        autoImports: ['defineStore', ['defineStore', 'definePiniaStore']],
      },
    ],
  ],

  build: {
    transpile:
      process.env.NODE_ENV === 'production'
        ? [
            'naive-ui',
            'vueuc',
            'libphonenumber-js',
            '@googlemaps/js-api-loader',
            'trpc-nuxt',
            'echarts',
          ]
        : [
            'libphonenumber-js',
            '@googlemaps/js-api-loader',
            'trpc-nuxt',
            'echarts',
          ],
  },
  chatgpt: {
    apiKey: process.env.OPENAI_API_KEY,
  },
  typescript: {
    strict: true,
    shim: false,
  },
  css: ['vue-tel-input/vue-tel-input.css'],

  naiveUI: {
    themeOverrides: {
      common: {
        primaryColor: '#A57C52FF',
        primaryColorSuppl: 'rgba(165, 124, 82, 1)',
        primaryColorHover: '#BD9975FF',
        primaryColorPressed: '#8A6642FF',
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
    EVER_TRANSIT_API_KEY: process.env.EVER_TRANSIT_API_KEY,
    OPENAI_API_KEY: process.env.OPENAI_API_KEY,
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      WEBSITE_URL: process.env.WEBSITE_URL,
    },
  },

  vite: {
    resolve: {
      alias: { '.prisma/client/index-browser': `@prisma/client/index-browser` },
    },
    optimizeDeps: {
      include:
        process.env.NODE_ENV === 'development'
          ? ['naive-ui', 'vueuc', 'date-fns-tz/esm/formatInTimeZone']
          : [],
    },
  },
  //@ts-ignore
  devtools: true,
})
