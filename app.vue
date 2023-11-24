<template>
  <div class="font-geist">
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

router.afterEach((to, from, failure) => {
  if (failure) {
    return;
  }

  if (!browsingStore.firstVisitHappened) {
    browsingStore.visitedNewPage(from);
    return;
  }

  browsingStore.visitedNewPage(to);
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
