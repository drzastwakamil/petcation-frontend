export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/image',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
    '@pinia/nuxt',
    '@vue-email/nuxt',
  ],
  vueEmail: {
    autoImport: true,
  },
  ssr: false,
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  nitro: {
    preset: 'netlify',
  },
  css: ['@/assets/css/tailwind.css', '@splidejs/vue-splide/css'],
  components: [
    {
      path: '~/components/Icons',
      global: true,
    },
    {
      path: '~/components',
      pathPrefix: false,
    },
  ],
  imports: {
    dirs: ['composables/**', 'utils/**'],
  },
  router: {
    options: {
      scrollBehaviorType: 'auto',
    },
  },
});
