<template>
  <AccordionItem v-bind="props" :class="cn('border-b', props.class ?? '')">
    <slot />
  </AccordionItem>
</template>

<script setup lang="ts">
import { AccordionItem, type AccordionItemProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<AccordionItemProps & { class?: string }>();
</script>
