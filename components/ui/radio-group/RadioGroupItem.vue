<template>
  <RadioGroupItem
    v-bind="props"
    :class="
      cn(
        'aspect-square h-4 w-4 rounded-full cursor-pointer flex justify-center items-center border border-primary disabled:cursor-not-allowed disabled:opacity-50',
        props.class,
      )
    "
  >
    <RadioGroupIndicator :class="cn('flex items-center justify-center', props.class)">
      <Circle class="h-2.5 w-2.5 text-foreground" />
    </RadioGroupIndicator>
  </RadioGroupItem>
</template>

<script setup lang="ts">
import { RadioGroupIndicator, RadioGroupItem, type RadioGroupItemProps } from 'radix-vue';
import { Circle } from 'lucide-vue-next';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<RadioGroupItemProps & { class?: string }>();
</script>
