<template>
  <DropdownMenuLabel v-bind="props" :class="cn('px-2 py-1.5 text-sm font-semibold', inset && 'pl-8', props.class)">
    <slot />
  </DropdownMenuLabel>
</template>

<script setup lang="ts">
import { DropdownMenuLabel, type DropdownMenuLabelProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<
  DropdownMenuLabelProps & {
    inset?: boolean;
    class?: string;
  }
>();
</script>
