export default defineNuxtConfig({
  modules: [
    '@nuxt/devtools',
    '@nuxtjs/tailwindcss',
    'nuxt-icon',
    '@nuxt/image',
    '@nuxtjs/eslint-module',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  nitro: {
    preset: 'netlify',
  },
  ssr: false,
  css: ['@/assets/css/tailwind.css'],
  components: [
    { path: '~/components/**' },
    {
      path: '~/components/Icons',
      global: true,
    },
    '~/components',
  ],
  imports: {
    dirs: ['composables/**', 'utils/**'],
  },
  router: {
    options: {
      scrollBehaviorType: 'smooth',
    },
  },
});
