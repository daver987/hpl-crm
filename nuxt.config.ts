// https://v3.nuxtjs.org/docs/directory-structure/nuxt.config
export default defineNuxtConfig({
  nitro: {
    preset: 'vercel',
  },
  css: ['assets/styles/main.scss'],
  modules: [
    '@pinia/nuxt',
    '@nuxtjs/supabase',
    'nuxt-quasar-vite',
    '@vueuse/nuxt',
    'nuxt-vitest',
    '@unocss/nuxt',
  ],
  build: {
    transpile: ['quasar'],
  },
  quasar: {
    // Optional string | boolean
    sassVariables: 'assets/styles/variables.scss',
    // Optional string[]
    // If you use animations, add Quasar Extra CSS animation URL here.
    css: [
      '@quasar/extras/material-icons/material-icons.css',
      '@quasar/extras/fontawesome-v6/fontawesome-v6.css',
    ],
    // List of extra Quasar Plugins
    // auto-installed: [Platform, Body, Dark, Screen, History, Lang, IconSet]
    // optional: [AddressbarColor, AppFullscreen, AppVisibility, BottomSheet, Dialog,
    //            LoadingBar, Loading, Notify, LocalStorage, SessionStorage]
    plugins: ['Dialog'],
    /* Quasar UI config -- you'll notice in Quasar docs when you need it */
    config: {
      dark: true,
    },
  },
  runtimeConfig: {
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
    TWILIO_ACCOUNT_SID: process.env.TWILIO_ACCOUNT_SID,
    TWILIO_AUTH_TOKEN: process.env.TWILIO_AUTH_TOKEN,
    TWILIO_API_KEY: process.env.TWILIO_API_KEY,
    TWILIO_MESSAGING_SERVICE_SID: process.env.TWILIO_MESSAGING_SERVICE_SID,
    TWILIO_CHAT_SERVICE_SID: process.env.TWILIO_CHAT_SERVICE_SID,
    TWILIO_API_SECRET: process.env.TWILIO_API_SECRET,
    ZAPIER_WEBHOOK_SECRET: process.env.ZAPIER_WEBHOOK_SECRET,
    ZAPIER_WEBHOOK_BOOK_ORDER: process.env.ZAPIER_WEBHOOK_BOOK_ORDER,
    public: {
      GOOGLE_MAPS_API_KEY: process.env.GOOGLE_MAPS_API_KEY,
      WEBSITE_URL: process.env.WEBSITE_URL,
      siteUrl: 'https://highparklivery.com/',
      siteName: 'Toronto Car Service | High Park Livery',
      siteDescription:
        'A top-rated Toronto car service, High Park Livery provides luxury transportation to and from Toronto Pearson Airport, Billy Bishop Airport, and more.',
      language: 'en-CA',
      titleSeparator: '|',
    },
  },
})
