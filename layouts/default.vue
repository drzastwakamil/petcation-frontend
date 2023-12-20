<template>
  <div class="flex min-h-screen flex-col">
    <div class="absolute w-full border-b">
      <div class="container z-10 mx-auto flex h-header w-full justify-between py-4">
        <NuxtLink class="select-none" to="/">
          <img class="h-full" src="/images/logo.svg" />
        </NuxtLink>
        <div class="flex items-center gap-5">
          <NuxtLink active-class="text-[#C28686] underline" to="/hotels"> Oferta </NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#features' }">
            <h5
              :class="{
                'text-[#C28686] underline': currentHash === '#features',
              }"
            >
              Funkcjonalności
            </h5>
          </NuxtLink>
          <NuxtLink :to="{ path: '/', hash: '#security' }">
            <h5
              :class="{
                'text-[#C28686] underline': currentHash === '#security',
              }"
            >
              Bezpieczeństwo
            </h5>
          </NuxtLink>

          <NuxtLink :to="{ path: '/joinUs', hash: '#security' }">
            <h5
              :class="{
                'text-[#C28686] underline': currentHash === '#security',
              }"
            >
              Dołącz do nas
            </h5>
          </NuxtLink>

          <SessionHandler />
        </div>
      </div>
    </div>
    <slot />
  </div>
</template>

<script lang="ts" setup>
import { useRoute } from 'nuxt/app';

const currentHash = computed(() => {
  return useRoute().hash;
});
</script>
