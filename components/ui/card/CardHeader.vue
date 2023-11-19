<template>
  <div :class="cn('flex flex-col space-y-1.5 p-6', props.class)">
    <slot />
  </div>
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
