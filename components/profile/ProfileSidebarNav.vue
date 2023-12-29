<template>
  <nav class="flex space-x-2 lg:flex-col lg:space-x-0 lg:space-y-1">
    <NuxtLink v-for="item in sidebarNavItems" :key="item.title" :to="item.href">
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
interface Item {
  title: string;
  href: string;
}

const $route = useRoute();

const sidebarNavItems: Item[] = [
  {
    title: 'Profil',
    href: '/settings/profile',
  },
  {
    title: 'Konto',
    href: '/settings/account',
  },
  {
    title: 'Zwierzaki',
    href: '/settings/animals',
  },
  {
    title: 'Rezerwacje',
    href: '/settings/reservations',
  },
];
</script>
