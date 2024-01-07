<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script>
definePageMeta({
  layout: 'settings',
  middleware: ['auth', 'hotel-role'],
  settingsItems: [
    {
      title: 'Konto',
      href: '/hotel/account',
    },
    {
      title: 'Rezerwacje',
      href: '/hotel/reservations',
    },
  ],
});
</script>
