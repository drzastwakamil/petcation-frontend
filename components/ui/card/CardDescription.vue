<template>
  <p :class="cn('text-sm text-muted-foreground', props.class)">
    <slot />
  </p>
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
