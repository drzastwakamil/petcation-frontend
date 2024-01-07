<template>
  <div class="font-geist">
    <div class="absolute">
      <Toaster />
    </div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup lang="ts">
import { VueQueryPlugin } from '@tanstack/vue-query';
useNuxtApp().vueApp.use(VueQueryPlugin);
</script>
