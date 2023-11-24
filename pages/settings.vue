<template>
  <div>
    <NuxtPage />
  </div>
</template>

<script>
definePageMeta({
  layout: 'settings',
  middleware: 'auth',
});
</script>
