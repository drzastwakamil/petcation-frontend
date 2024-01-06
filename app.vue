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
import { useRouter } from 'nuxt/app';
import { VueQueryPlugin } from '@tanstack/vue-query';
useNuxtApp().vueApp.use(VueQueryPlugin);
const router = useRouter();
const userSession = useUserSessionStore();
const browsingStore = useBrowsingStore();

router.afterEach((_, from, failure) => {
  if (failure) {
    return;
  }
  browsingStore.visitedNewPage(from);
});

userSession.$subscribe(() => {
  if (userSession.isLoggedIn) {
    return;
  }

  if (isPageAuthProtected(useRoute())) {
    navigateTo(browsingStore.lastVisitedNonAuthPage);
  }
});
</script>
