<template>
  <SelectGroup :class="cn('p-1 w-full', props.class)" v-bind="props">
    <slot />
  </SelectGroup>
</template>

<script setup lang="ts">
import { SelectGroup, type SelectGroupProps } from 'radix-vue';
import { cn } from '@/utils/shadcn/utils';

const props = defineProps<SelectGroupProps & { class?: string }>();
</script>
