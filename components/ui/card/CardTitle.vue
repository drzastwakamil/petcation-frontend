<template>
  <h3 :class="cn('text-2xl font-semibold leading-none tracking-tighter', props.class)">
    <slot />
  </h3>
</template>

<script setup lang="ts">
import { cn } from '@/utils/shadcn/utils';

const props = defineProps({
  class: {
    type: String,
    default: '',
  },
});
</script>
