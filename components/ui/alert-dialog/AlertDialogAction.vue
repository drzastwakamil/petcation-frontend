<template>
  <AlertDialogAction v-bind="props" :class="cn(buttonVariants(), $attrs.class ?? '')">
    <slot />
  </AlertDialogAction>
</template>

<script setup lang="ts">
import { AlertDialogAction, type AlertDialogActionProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';
import { buttonVariants } from '@/components/ui/commonButton';

const props = defineProps<AlertDialogActionProps>();
</script>