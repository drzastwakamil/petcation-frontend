<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <NuxtLink v-for="item in navItems" :key="item.title" :to="item.href">
      <Button
        :key="item.title"
        as="a"
        :class="cn('w-full text-left justify-start', $route.path === item.href && 'bg-muted hover:bg-muted')"
        variant="ghost"
      >
        {{ item.title }}
      </Button>
    </NuxtLink>
  </nav>
</template>

<script setup lang="ts">
import { useRoute } from 'nuxt/app';

defineProps<{
  navItems: Array<{
    title: string;
    href: string;
  }>;
}>();
const $route = useRoute();
</script>
