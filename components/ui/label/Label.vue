<template>
  <Label v-bind="props" :class="cn('block text-sm tracking-tight font-medium text-foreground text-left', props.class)">
    <slot />
  </Label>
</template>

<script setup lang="ts">
import { Label, type LabelProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<LabelProps & { class?: string }>();
</script>
