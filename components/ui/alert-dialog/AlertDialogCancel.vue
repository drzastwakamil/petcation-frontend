<template>
  <AlertDialogCancel
    v-bind="props"
    :class="cn(buttonVariants({ variant: 'outline' }), 'mt-2 sm:mt-0', $attrs.class ?? '')"
  >
    <slot />
  </AlertDialogCancel>
</template>

<script setup lang="ts">
import { AlertDialogCancel, type AlertDialogCancelProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';
import { buttonVariants } from '@/components/ui/commonButton';

const props = defineProps<AlertDialogCancelProps>();
</script>