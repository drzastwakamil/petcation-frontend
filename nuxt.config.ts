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
  css: ['@/assets/css/tailwind.css', '@/node_modules/@splidejs/splide/dist/css/splide.min.css'],
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
      scrollBehaviorType: 'auto',
    },
  },
});