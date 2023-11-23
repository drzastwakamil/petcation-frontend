<template>
  <Separator
    :class="[
      cn('shrink-0 bg-secondary', props.class),
      props.orientation === 'vertical' ? 'h-full w-px' : 'h-px w-full',
    ]"
  />
</template>

<script setup lang="ts">
import { Separator, type SeparatorProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<SeparatorProps & { class?: string }>();
</script>
