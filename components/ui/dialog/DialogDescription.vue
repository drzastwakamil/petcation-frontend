<template>
  <DialogDescription v-bind="props" :class="cn('text-zinc-500 text-sm dark:text-zinc-400', props.class)">
    <slot />
  </DialogDescription>
</template>

<script setup lang="ts">
import { DialogDescription, type DialogDescriptionProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<DialogDescriptionProps & { class?: string }>();
</script>
