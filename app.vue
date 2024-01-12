<template>
  <div class="font-geist">
    <!-- <div class="absolute">
      <Toaster />
    </div> -->
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { VueQueryPlugin } from '@tanstack/vue-query';
import VueSplide from '@splidejs/vue-splide';
const { vueApp } = useNuxtApp();
vueApp.use(VueQueryPlugin);
vueApp.use(VueSplide);
</script>
