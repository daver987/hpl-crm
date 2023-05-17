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
            '@juggle/resize-observer',
            'libphonenumber-js',
            '@googlemaps/js-api-loader',
            'trpc-nuxt',
          ]
        : [
            '@juggle/resize-observer',
            'libphonenumber-js',
            '@googlemaps/js-api-loader',
            'trpc-nuxt',
          ],
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
    EVER_TRANSIT_API_KEY: process.env.EVER_TRANSIT_API_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      WEBSITE_URL: process.env.WEBSITE_URL,
      CLERK_PUBLISHABLE_KEY: process.env.CLERK_PUBLISHABLE_KEY,
    },
  },

  nitro: {
    preset: 'netlify',
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
