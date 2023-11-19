<template>
  <DialogTitle
    v-bind="props"
    :class="cn('text-lg text-zinc-950 font-semibold leading-none tracking-tight dark:text-zinc-50', props.class)"
  >
    <slot />
  </DialogTitle>
</template>

<script setup lang="ts">
import { DialogTitle, type DialogTitleProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<DialogTitleProps & { class?: string }>();
</script>
