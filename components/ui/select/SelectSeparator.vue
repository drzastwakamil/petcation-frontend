<template>
  <SelectSeparator :class="cn('-mx-1 my-1 h-px bg-muted', props.class)" />
</template>

<script setup lang="ts">
import { SelectSeparator, type SelectSeparatorProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<SelectSeparatorProps & { class?: string }>();
</script>
