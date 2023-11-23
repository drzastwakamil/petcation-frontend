<template>
  <SelectLabel :class="cn('py-1.5 pl-8 pr-2 text-sm font-semibold', props.class)">
    <slot />
  </SelectLabel>
</template>

<script setup lang="ts">
import { SelectLabel, type SelectLabelProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<SelectLabelProps & { class?: string }>();
</script>
