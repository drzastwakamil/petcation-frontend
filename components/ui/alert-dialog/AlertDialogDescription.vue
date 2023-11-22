<template>
  <AlertDialogDescription :as-child="props.asChild" :class="cn('text-muted-foreground text-sm', props.class)">
    <slot />
  </AlertDialogDescription>
</template>

<script setup lang="ts">
import { AlertDialogDescription, type AlertDialogDescriptionProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<AlertDialogDescriptionProps & { class?: string }>();
</script>
