<template>
  <div class="p-10 pb-16">
    <div class="flex justify-between">
      <div class="flex items-center space-x-5">
        <NuxtLink to="/">
          <Button size="icon" variant="ghost">
            <ArrowLeftIcon />
          </Button>
        </NuxtLink>
        <div class="space-y-0.5">
          <h2 id="title" class="text-2xl font-bold tracking-tight" />
          <p id="description" class="text-muted-foreground" />
        </div>
      </div>

      <SessionHandler />
    </div>
    <Separator class="my-6" />
    <div class="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
      <aside class="-mx-4 lg:w-1/5">
        <ProfileSidebarNav :nav-items="route.meta.settingsItems" />
      </aside>
      <div class="flex-1 lg:max-w-2xl">
        <div class="space-y-6">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowLeftIcon } from 'lucide-vue-next';

const route = useRoute();
</script>
