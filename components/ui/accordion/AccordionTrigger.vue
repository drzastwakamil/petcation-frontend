<template>
  <AccordionHeader as="div" class="flex">
    <AccordionTrigger
      v-bind="props"
      :class="
        cn(
          'flex flex-1 items-center justify-between py-4 font-medium transition-all hover:underline [&[data-state=open]>svg]:rotate-180',
          props.class,
        )
      "
    >
      <slot />
      <ChevronDown class="h-4 w-4 shrink-0 transition-transform duration-200" />
    </AccordionTrigger>
  </AccordionHeader>
</template>

<script setup lang="ts">
import { AccordionHeader, AccordionTrigger, type AccordionTriggerProps } from 'radix-vue';
import { ChevronDown } from 'lucide-vue-next';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<AccordionTriggerProps & { class?: string }>();
</script>
