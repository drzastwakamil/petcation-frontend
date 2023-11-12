<template>
  <div>it's a test component for fun</div>
</template>

<script setup lang="ts">
defineProps<{
  content: Array<{ id: string; value: string }>;
}>();
</script>
