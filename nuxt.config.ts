export default defineNuxtConfig({
  modules: ['@nuxt/devtools', '@nuxtjs/tailwindcss', 'nuxt-icon', '@nuxt/image', '@nuxtjs/eslint-module'],
  devtools: {
    enabled: true,
    timeline: {
      enabled: true,
    },
  },
  components: [
    { path: '~/components/' },
    {
      path: '~/components/Icons',
      global: true,
    },
    '~/components',
  ],
  imports: {
    dirs: ['composables/**', 'utils/**'],
  },
});
