<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script>
definePageMeta({
  layout: 'settings',
  middleware: ['auth', 'user-role'],
  settingsItems: [
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
  ],
});
</script>
