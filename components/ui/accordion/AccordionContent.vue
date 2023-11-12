<template>
  <AccordionContent
    v-bind="props"
    :class="
      cn(
        'overflow-hidden text-sm transition-all data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down',
        props.class,
      )
    "
  >
    <div class="pb-4 pt-0">
      <slot />
    </div>
  </AccordionContent>
</template>

<script setup lang="ts">
import { AccordionContent, type AccordionContentProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<AccordionContentProps & { class?: string }>();
</script>
